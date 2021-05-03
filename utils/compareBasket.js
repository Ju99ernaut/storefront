// the compare basket
export default class CompareBasket {
    constructor(itemsDom) {
        this.el = document.querySelector('.compare-basket');
        this.viewEl = document.querySelector('.view');
        this.compareCtrl = this.el.querySelector('.action--compare');
        this.compareWrapper = document.querySelector('.compare'),
            this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close');

        this.itemsAllowed = 3;
        this.totalItems = 0;
        this.items = [];
        this.itemsDom = itemsDom;

        // compares items in the compare basket: opens the compare products wrapper
        this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
        // close the compare products wrapper
        const self = this;
        this.closeCompareCtrl.addEventListener('click', function () {
            // toggle compare basket
            self.el.classList.add('compare-basket--active');
            // animate...
            self.viewEl.classList.remove('view--compare');
        });
    }

    add(item) {
        // check limit
        if (this.isFull()) {
            return false;
        }

        item.querySelector('.slider').classList.add('product--selected');

        // create item preview element
        const preview = this._createItemPreview(item);
        // prepend it to the basket
        this.el.insertBefore(preview, this.el.childNodes[0]);
        // insert item
        this.items.push(preview);

        this.totalItems++;
        if (this.isFull()) {
            this.el.classList.add('compare-basket--full');
        }

        this.el.classList.add('compare-basket--active');
    }

    _createItemPreview(item) {
        const self = this;

        const preview = document.createElement('div');
        preview.className = 'product-icon';
        preview.setAttribute('data-idx', this.itemsDom.indexOf(item));

        const removeCtrl = document.createElement('button');
        removeCtrl.className = 'action action--remove';
        removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">Remove product</span>';
        removeCtrl.addEventListener('click', function () {
            self.remove(item);
        });

        const productImageEl = item.querySelector('.slider__item > img').cloneNode(true);

        preview.appendChild(productImageEl);
        preview.appendChild(removeCtrl);

        const productInfo = productImageEl.outerHTML + item.querySelector('.meta').innerHTML;
        preview.setAttribute('data-info', productInfo);

        return preview;
    }

    remove(item) {
        this.el.classList.remove('compare-basket--full');
        item.querySelector('.slider').classList.remove('product--selected');
        const preview = this.el.querySelector('[data-idx = "' + this.itemsDom.indexOf(item) + '"]');
        this.el.removeChild(preview);
        this.totalItems--;

        const indexRemove = this.items.indexOf(preview);
        this.items.splice(indexRemove, 1);

        if (this.totalItems === 0) {
            this.el.classList.remove('compare-basket--active');
        }

        // checkbox
        const checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
        if (checkbox.checked) {
            checkbox.checked = false;
        }
    }

    _compareItems() {
        const self = this;

        // remove all previous items inside the compareWrapper element
        [].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function (item) {
            self.compareWrapper.removeChild(item);
        });

        for (let i = 0; i < this.totalItems; ++i) {
            const compareItemWrapper = document.createElement('div');
            compareItemWrapper.className = 'compare__item';

            const compareItemEffectEl = document.createElement('div');
            compareItemEffectEl.className = 'compare__effect';

            compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');
            compareItemWrapper.appendChild(compareItemEffectEl);

            this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
        }

        setTimeout(function () {
            // toggle compare basket
            self.el.classList.remove('compare-basket--active');
            // animate...
            self.viewEl.classList.add('view--compare');
        }, 25);
    }

    isFull() {
        return this.totalItems === this.itemsAllowed;
    }
}