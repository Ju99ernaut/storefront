import { useEffect } from 'react';
import BottomBar from '../components/BottomBar';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Hamburger from '../components/Hamburger';
import Grid from '../components/Grid';
import CompareBasket from '../components/CompareBasket';
import CompareWrapper from '../components/CompareWrapper';
import imagesLoaded from '../utils/imagesLoaded';
import throttle from '../utils/throttle';
import menuTouch from '../utils/touch';
import Shuffle from 'shufflejs';
import CompareBasketObj from '../utils/compareBasket';
import MLMenu from '../utils/menu';
//import Swiper from 'swiper/bundle';
import Swiper, { Pagination, EffectCoverflow, Zoom } from 'swiper/core';
import 'swiper/swiper-bundle.css';

export default function Home() {
  Swiper.use([Pagination, EffectCoverflow, Zoom]);

  useEffect(() => {
    // sliders - swiper
    let sliders = [].slice.call(document.querySelectorAll('.swiper-container')),
      // array where the swiper instances are going to be stored
      swipers = [],
      //viewEl = document.querySelector('.view'),
      mlmenu,
      menuEl = document.getElementById('ml-menu'),
      openMenuCtrl = document.querySelector('.action--open'),
      closeMenuCtrl = document.querySelector('.action--close-nav'),
      items = [].slice.call(document.querySelectorAll('.grid__item')),
      basket,
      // grid element
      grid = document.querySelector('.grid'),
      // shuffle instance
      shuffle,
      // filter ctrls
      filterCtrls = [].slice.call(document.querySelectorAll('.filter > button')),
      // cart
      cart = document.querySelector('.cart'),
      cartItems = cart.querySelector('.cart__count');
    //zoomCtrls = [].slice.call(document.querySelectorAll('.action--zoom'));

    const support = { animations: window.Modernizr.cssanimations },
      animEndEventNames = { 'WebkitAnimation': 'webkitAnimationEnd', 'OAnimation': 'oAnimationEnd', 'msAnimation': 'MSAnimationEnd', 'animation': 'animationend' },
      animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    function onEndAnimation(el, callback) {
      var onEndCallbackFn = function (ev) {
        if (support.animations) {
          if (ev.target != this) return;
          this.removeEventListener(animEndEventName, onEndCallbackFn);
        }
        if (callback && typeof callback === 'function') { callback.call(); }
      };
      if (support.animations) {
        el.addEventListener(animEndEventName, onEndCallbackFn);
      }
      else {
        onEndCallbackFn();
      }
    }

    function init() {
      // preload images
      imagesLoaded(grid, function () {
        basket = new CompareBasketObj(items);
        mlmenu = new MLMenu(menuEl, {
          onEndAnimation,
          // breadcrumbsCtrl : true, // show breadcrumbs
          // initialBreadcrumb : 'all', // initial breadcrumb text
          // backCtrl : false, // show back button
          // itemsDelayInterval : 60, // delay between each menu item sliding animation
          // onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
        });
        initSwiper();
        initShuffle();
        initEvents();
        grid.classList.remove('grid--loading');
      });
    }

    function initSwiper() {
      sliders.forEach(function (slider) {
        const el = slider.querySelector('.swiper-pagination');
        const swpr = new Swiper(slider, {
          autoHeight: true,
          effect: 'coverflow',
          grabCursor: true,
          zoom: true,
          pagination: {
            el,
            clickable: true
          }
          //resize: false
        });

        // store swiper instances
        swipers.push(swpr);
      });
    }

    function initShuffle() {
      shuffle = new Shuffle(grid, {
        isResizeBound: false,
        itemSelector: '.grid__item',
        percentPosition: true,
        sizer: '.grid__sizer',
        speed: 600
      });
    }

    function initEvents() {
      filterCtrls.forEach(function (filterCtrl) {
        filterCtrl.addEventListener('click', function () {
          filterCtrl.parentNode.querySelector('.filter__item--selected')
            .classList.remove('filter__item--selected');
          filterCtrl.classList.add('filter__item--selected');
          const filterStr = filterCtrl.getAttribute('data-filter');
          let filter = filterStr === 'all' ? Shuffle.ALL_ITEMS :
            function (el) {
              return el.classList.contains(filterStr);
            }
          shuffle.filter(filter);
          //recalcSwipers();
          shuffle.layout();
        });
      });

      // window resize / recalculate sizes for both flickity and isotope/masonry layouts
      window.addEventListener('resize', throttle(function (ev) {
        //recalcSwipers()
        shuffle.layout();
      }, 50));

      // add to cart
      [].slice.call(grid.querySelectorAll('.grid__item')).forEach(function (item) {
        const btn = item.querySelector('.action--buy');
        btn && btn.addEventListener('click', addToCart);
      });

      items.forEach(function (item) {
        const checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
        checkbox.checked = false;

        // ctrl to add to the "compare basket"
        checkbox.addEventListener('click', function (ev) {
          if (ev.target.checked) {
            if (basket.isFull()) {
              ev.preventDefault();
              return false;
            }
            basket.add(item);
          } else {
            basket.remove(item);
          }
        });
      });

      openMenuCtrl.addEventListener('click', openMenu);
      closeMenuCtrl.addEventListener('click', closeMenu);

      menuTouch(menuEl, openMenuCtrl, openMenu, closeMenu, .5);
    }

    function openMenu() {
      menuEl.classList.add('menu--open');
      closeMenuCtrl.focus();
    }

    function closeMenu() {
      menuEl.classList.remove('menu--open');
      openMenuCtrl.focus();
    }

    function addToCart() {
      cart.classList.add('cart--animate');
      setTimeout(function () { cartItems.innerHTML = Number(cartItems.innerHTML) + 1; }, 200);
      onEndAnimation(cartItems, function () {
        cart.classList.remove('cart--animate');
      });
    }

    init();
  }, []);

  return (
    <>
      <CompareBasket />
      <BottomBar />
      <Hamburger />
      <SideBar />
      <div className="view">
        <NavBar />
        <Grid />
      </div>
      <CompareWrapper />
    </>
  )
}
