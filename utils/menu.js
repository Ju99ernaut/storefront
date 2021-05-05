import extend from './extend';

export default class MLMenu {
    constructor(el, options) {
        this.el = el;
        this.options = extend({}, {
            // show breadcrumbs
            breadcrumbsCtrl: true,
            // initial breadcrumb text
            initialBreadcrumb: 'all',
            // show back button
            backCtrl: true,
            // delay between each menu item sliding animation
            itemsDelayInterval: 60,
            // direction 
            direction: 'r2l',
            // callback: item that doesn´t have a submenu gets clicked
            // onItemClick([event], [inner HTML of the clicked item])
            onItemClick: function (ev, itemName) { return false; }
        });
        extend(this.options, options);

        // the menus (<ul>´s)
        this.menus = [].slice.call(this.el.querySelectorAll('.menu__level'));

        // index of current menu
        // Each level is actually a different menu so 0 is root, 1 is sub-1, 2 sub-2, etc.
        this.current_menu = 0;

        /* Determine what current menu actually is */
        let current_menu;
        this.menus.forEach(function (menuEl, pos) {
            const items = menuEl.querySelectorAll('.menu__item');
            items.forEach(function (itemEl, iPos) {
                const currentLink = itemEl.querySelector('.menu__link--current');
                if (currentLink) {
                    // This is the actual menu__level that should have current
                    current_menu = pos;
                }
            });
        });

        if (current_menu) {
            this.current_menu = current_menu;
        }

        this._init();
    }

    _init() {
        // iterate the existing menus and create an array of menus, 
        // more specifically an array of objects where each one holds the info of each menu element and its menu items
        this.menusArr = [];
        this.breadCrumbs = false;
        const self = this;
        const submenus = [];

        /* Loops over root level menu items */
        this.menus.forEach(function (menuEl, pos) {
            const menu = { menuEl: menuEl, menuItems: [].slice.call(menuEl.querySelectorAll('.menu__item')) };

            self.menusArr.push(menu);

            // set current menu class
            if (pos === self.current_menu) {
                menuEl.classList.add('menu__level--current');
            }

            const menu_x = menuEl.getAttribute('data-menu');
            const links = menuEl.querySelectorAll('.menu__link');
            links.forEach(function (linkEl, lPos) {
                const submenu = linkEl.getAttribute('data-submenu');
                if (submenu) {
                    const pushMe = { "menu": submenu, "name": linkEl.innerHTML };
                    if (submenus[pos]) {
                        submenus[pos].push(pushMe);
                    } else {
                        submenus[pos] = [];
                        submenus[pos].push(pushMe);
                    }
                }
            });
        });

        /* For each MENU, find their parent MENU */
        this.menus.forEach(function (menuEl, pos) {
            const menu_x = menuEl.getAttribute('data-menu');
            submenus.forEach(function (subMenuEl, menu_root) {
                subMenuEl.forEach(function (subMenuItem, subPos) {
                    if (subMenuItem.menu === menu_x) {
                        self.menusArr[pos].backIdx = menu_root;
                        self.menusArr[pos].name = subMenuItem.name;
                    }
                });
            });
        });

        // create breadcrumbs
        if (self.options.breadcrumbsCtrl) {
            this.breadcrumbsCtrl = document.createElement('nav');
            this.breadcrumbsCtrl.className = 'menu__breadcrumbs';
            this.breadcrumbsCtrl.setAttribute('aria-label', 'You are here');
            this.el.insertBefore(this.breadcrumbsCtrl, this.el.firstChild);
            // add initial breadcrumb
            this._addBreadcrumb(0);

            // Need to add breadcrumbs for all parents of current submenu
            if (self.menusArr[self.current_menu].backIdx !== 0 && self.current_menu !== 0) {
                this._crawlCrumbs(self.menusArr[self.current_menu].backIdx, self.menusArr);
                this.breadCrumbs = true;
            }

            // Create current submenu breadcrumb
            if (self.current_menu !== 0) {
                this._addBreadcrumb(self.current_menu);
                this.breadCrumbs = true;
            }
        }

        // create back button
        if (this.options.backCtrl) {
            this.backCtrl = document.createElement('button');
            if (this.breadCrumbs) {
                this.backCtrl.className = 'menu__back';
            } else {
                this.backCtrl.className = 'menu__back menu__back--hidden';
            }
            this.backCtrl.setAttribute('aria-label', 'Go back');
            this.backCtrl.innerHTML = '<span class="fa-icon icon--arrow-left"></span>';
            this.el.insertBefore(this.backCtrl, this.el.firstChild);
        }

        // event binding
        this._initEvents();
    }

    _initEvents() {
        const self = this;

        for (let i = 0, len = this.menusArr.length; i < len; ++i) {
            this.menusArr[i].menuItems.forEach(function (item, pos) {
                item.querySelector('a').addEventListener('click', function (ev) {
                    const submenu = ev.target.getAttribute('data-submenu'),
                        itemName = ev.target.innerHTML,
                        subMenuEl = self.el.querySelector('ul[data-menu="' + submenu + '"]');

                    // check if there's a sub menu for this item
                    if (submenu && subMenuEl) {
                        ev.preventDefault();
                        // open it
                        self._openSubMenu(subMenuEl, pos, itemName);
                    }
                    else {
                        // add class current
                        const currentlink = self.el.querySelector('.menu__link--current');
                        if (currentlink) {
                            self.el.querySelector('.menu__link--current').classList.remove('.menu__link--current');
                        }
                        ev.target.classList.add('menu__link--current');

                        // callback
                        self.options.onItemClick(ev, itemName);
                    }
                });
            });
        }

        // back navigation
        if (this.options.backCtrl) {
            this.backCtrl.addEventListener('click', function () {
                self._back();
            });
        }
    }

    _openSubMenu(subMenuEl, clickPosition, subMenuName) {
        if (this.isAnimating) {
            return false;
        }
        this.isAnimating = true;

        // save "parent" menu index for back navigation
        this.menusArr[this.menus.indexOf(subMenuEl)].backIdx = this.current_menu;
        // save "parent" menu´s name
        this.menusArr[this.menus.indexOf(subMenuEl)].name = subMenuName;
        // current menu slides out
        this._menuOut(clickPosition);
        // next menu (submenu) slides in
        this._menuIn(subMenuEl, clickPosition);
    }

    _back() {
        if (this.isAnimating) {
            return false;
        }
        this.isAnimating = true;

        // current menu slides out
        this._menuOut();
        // next menu (previous menu) slides in
        const backMenu = this.menusArr[this.menusArr[this.current_menu].backIdx].menuEl;
        this._menuIn(backMenu);

        // remove last breadcrumb
        if (this.options.breadcrumbsCtrl) {
            this.breadcrumbsCtrl.removeChild(this.breadcrumbsCtrl.lastElementChild);
        }
    }

    _menuOut(clickPosition) {
        // the current menu
        const self = this,
            currentMenu = this.menusArr[this.current_menu].menuEl,
            isBackNavigation = typeof clickPosition === 'undefined' ? true : false;

        // slide out current menu items - first, set the delays for the items
        this.menusArr[this.current_menu].menuItems.forEach(function (item, pos) {
            item.style.WebkitAnimationDelay = item.style.animationDelay = isBackNavigation ? parseInt(pos * self.options.itemsDelayInterval) + 'ms' : parseInt(Math.abs(clickPosition - pos) * self.options.itemsDelayInterval) + 'ms';
        });
        // animation class
        if (this.options.direction === 'r2l') {
            currentMenu.classList.add(!isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
        }
        else {
            currentMenu.classList.add(isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
        }
    }

    _menuIn(_nextMenuEl, clickPosition) {
        const self = this,
            // the current menu
            currentMenu = this.menusArr[this.current_menu].menuEl,
            isBackNavigation = typeof clickPosition === 'undefined' ? true : false,
            // index of the nextMenuEl
            nextMenuIdx = this.menus.indexOf(_nextMenuEl),

            nextMenu = this.menusArr[nextMenuIdx],
            nextMenuEl = nextMenu.menuEl,
            nextMenuItems = nextMenu.menuItems,
            nextMenuItemsTotal = nextMenuItems.length;

        // slide in next menu items - first, set the delays for the items
        nextMenuItems.forEach(function (item, pos) {
            item.style.WebkitAnimationDelay = item.style.animationDelay = isBackNavigation ? parseInt(pos * self.options.itemsDelayInterval) + 'ms' : parseInt(Math.abs(clickPosition - pos) * self.options.itemsDelayInterval) + 'ms';

            // we need to reset the classes once the last item animates in
            // the "last item" is the farthest from the clicked item
            // let's calculate the index of the farthest item
            const farthestIdx = clickPosition <= nextMenuItemsTotal / 2 || isBackNavigation ? nextMenuItemsTotal - 1 : 0;

            if (pos === farthestIdx) {
                self.options.onEndAnimation(item, function () {
                    // reset classes
                    if (self.options.direction === 'r2l') {
                        currentMenu.classList.remove(!isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
                        nextMenuEl.classList.remove(!isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
                    }
                    else {
                        currentMenu.classList.remove(isBackNavigation ? 'animate-outToLeft' : 'animate-outToRight');
                        nextMenuEl.classList.remove(isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
                    }
                    currentMenu.classList.remove('menu__level--current');
                    nextMenuEl.classList.add('menu__level--current');

                    //reset current
                    self.current_menu = nextMenuIdx;

                    // control back button and breadcrumbs navigation elements
                    if (!isBackNavigation) {
                        // show back button
                        if (self.options.backCtrl) {
                            self.backCtrl.classList.remove('menu__back--hidden');
                        }

                        // add breadcrumb
                        self._addBreadcrumb(nextMenuIdx);
                    }
                    else if (self.current_menu === 0 && self.options.backCtrl) {
                        // hide back button
                        self.backCtrl.classList.add('menu__back--hidden');
                    }

                    // we can navigate again..
                    self.isAnimating = false;

                    // focus retention
                    nextMenuEl.focus();
                });
            }
        });

        // animation class
        if (this.options.direction === 'r2l') {
            nextMenuEl.classList.add(!isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
        }
        else {
            nextMenuEl.classList.add(isBackNavigation ? 'animate-inFromRight' : 'animate-inFromLeft');
        }
    }

    _addBreadcrumb(idx) {
        if (!this.options.breadcrumbsCtrl) {
            return false;
        }

        const bc = document.createElement('a');
        bc.href = '#'; // make it focusable
        bc.innerHTML = idx ? this.menusArr[idx].name : this.options.initialBreadcrumb;
        this.breadcrumbsCtrl.appendChild(bc);

        const self = this;
        bc.addEventListener('click', function (ev) {
            ev.preventDefault();

            // do nothing if this breadcrumb is the last one in the list of breadcrumbs
            if (!bc.nextSibling || self.isAnimating) {
                return false;
            }
            self.isAnimating = true;

            // current menu slides out
            self._menuOut();
            // next menu slides in
            const nextMenu = self.menusArr[idx].menuEl;
            self._menuIn(nextMenu);

            // remove breadcrumbs that are ahead
            let siblingNode;
            while (siblingNode = bc.nextSibling) {
                self.breadcrumbsCtrl.removeChild(siblingNode);
            }
        });
    }
    _crawlCrumbs(currentMenu, menuArray) {
        if (menuArray[currentMenu].backIdx !== 0) {
            this._crawlCrumbs(menuArray[currentMenu].backIdx, menuArray);
        }
        // create breadcrumb
        this._addBreadcrumb(currentMenu);
    }
}