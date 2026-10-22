'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import styles from '../styles/Hamburger.module.css';
import { CATEGORY_MENUS, CategoryMenuItem } from '../data/products';

const ITEMS_DELAY_INTERVAL = 60;
const ANIMATION_DURATION = 600;

interface BreadcrumbEntry {
  menuId: string;
  label: string;
  filter: string;
}

interface MenuAnimState {
  fromMenuId: string;
  toMenuId: string;
  direction: 'forward' | 'back';
  clickPosition?: number;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
}

const SideBar = ({
  isOpen,
  onClose,
  activeFilter,
  onSelectFilter,
}: SideBarProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbEntry[]>([
    { menuId: 'main', label: 'all', filter: 'all' },
  ]);
  const [animState, setAnimState] = useState<MenuAnimState | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  const currentMenuId = breadcrumbs[breadcrumbs.length - 1].menuId;

  // Sync sidebar menu level when top-level filter is changed externally (e.g. BottomBar)
  useEffect(() => {
    if (animState) return;
    if (activeFilter === 'all') {
      setBreadcrumbs([{ menuId: 'main', label: 'all', filter: 'all' }]);
      return;
    }
    const topSubmenuId = `submenu-${activeFilter}`;
    if (CATEGORY_MENUS[topSubmenuId]) {
      const currentCrumb = breadcrumbs[breadcrumbs.length - 1];
      const currentMenu = CATEGORY_MENUS[currentCrumb.menuId];
      const belongsToCurrentMenu =
        currentCrumb.menuId === topSubmenuId ||
        currentMenu?.parentId === topSubmenuId;
      if (!belongsToCurrentMenu) {
        setBreadcrumbs([
          { menuId: 'main', label: 'all', filter: 'all' },
          {
            menuId: topSubmenuId,
            label: CATEGORY_MENUS[topSubmenuId].name,
            filter: activeFilter,
          },
        ]);
      }
    }
  }, [activeFilter]);

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [isOpen]);

  const navigateToMenu = (
    targetMenuId: string,
    nextBreadcrumbs: BreadcrumbEntry[],
    direction: 'forward' | 'back',
    clickPosition?: number
  ) => {
    if (animState || targetMenuId === currentMenuId) return;

    const targetMenu = CATEGORY_MENUS[targetMenuId];
    const itemCount = targetMenu ? targetMenu.items.length : 1;
    const maxDelay = itemCount * ITEMS_DELAY_INTERVAL;

    setAnimState({
      fromMenuId: currentMenuId,
      toMenuId: targetMenuId,
      direction,
      clickPosition,
    });

    setTimeout(() => {
      setBreadcrumbs(nextBreadcrumbs);
      setAnimState(null);
    }, ANIMATION_DURATION + maxDelay);
  };

  const handleMenuItemClick = (
    ev: MouseEvent<HTMLAnchorElement>,
    item: CategoryMenuItem,
    pos: number
  ) => {
    ev.preventDefault();
    if (animState) return;

    if (item.submenu && CATEGORY_MENUS[item.submenu]) {
      const nextBreadcrumbs: BreadcrumbEntry[] = [
        ...breadcrumbs,
        {
          menuId: item.submenu,
          label: item.label,
          filter: item.filter || 'all',
        },
      ];
      if (item.filter) {
        onSelectFilter(item.filter);
      }
      navigateToMenu(item.submenu, nextBreadcrumbs, 'forward', pos);
    } else if (item.filter) {
      onSelectFilter(item.filter);
    }
  };

  const handleBack = () => {
    if (animState || breadcrumbs.length <= 1) return;
    const nextBreadcrumbs = breadcrumbs.slice(0, -1);
    const parentCrumb = nextBreadcrumbs[nextBreadcrumbs.length - 1];
    if (parentCrumb?.filter) {
      onSelectFilter(parentCrumb.filter);
    }
    navigateToMenu(parentCrumb.menuId, nextBreadcrumbs, 'back', undefined);
  };

  const handleBreadcrumbClick = (
    ev: MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    ev.preventDefault();
    if (animState || index === breadcrumbs.length - 1) return;
    const nextBreadcrumbs = breadcrumbs.slice(0, index + 1);
    const targetCrumb = nextBreadcrumbs[nextBreadcrumbs.length - 1];
    if (targetCrumb?.filter) {
      onSelectFilter(targetCrumb.filter);
    }
    navigateToMenu(targetCrumb.menuId, nextBreadcrumbs, 'back', undefined);
  };

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartXRef.current = e.changedTouches[0].clientX;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) return;
    const currentX = e.changedTouches[0]?.clientX ?? 0;
    const dx = currentX - touchStartXRef.current;
    if (dx < 0) {
      setDragOffsetX(Math.round(dx));
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) return;
    const currentX = e.changedTouches[0]?.clientX ?? 0;
    const dx = currentX - touchStartXRef.current;
    if (dx < -90) {
      onClose();
    }
    touchStartXRef.current = null;
    setDragOffsetX(0);
  };

  const getItemDelay = (
    pos: number,
    isBackNavigation: boolean,
    clickPosition?: number
  ) => {
    const delayMs = isBackNavigation
      ? pos * ITEMS_DELAY_INTERVAL
      : Math.abs((clickPosition ?? 0) - pos) * ITEMS_DELAY_INTERVAL;
    return `${delayMs}ms`;
  };

  return (
    <nav
      id="ml-menu"
      className={`menu left${isOpen ? ' menu--open' : ''}`}
      style={
        dragOffsetX < 0
          ? { transform: `translate3d(${dragOffsetX}px, 0, 0)` }
          : undefined
      }
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Category Menu"
    >
      <button
        type="button"
        className={`menu__back${
          breadcrumbs.length <= 1 ? ' menu__back--hidden' : ''
        }`}
        aria-label="Go back"
        onClick={handleBack}
      >
        <span className="fa-icon icon--arrow-left"></span>
      </button>

      <nav className="menu__breadcrumbs" aria-label="You are here">
        {breadcrumbs.map((crumb, idx) => (
          <a
            key={`${crumb.menuId}-${idx}`}
            href={`#${crumb.menuId}`}
            onClick={(ev) => handleBreadcrumbClick(ev, idx)}
          >
            {crumb.label}
          </a>
        ))}
      </nav>

      <button
        ref={closeBtnRef}
        type="button"
        className={`${styles.action} action--close-nav`}
        aria-label="Close Menu"
        onClick={onClose}
      >
        <span className="fa-icon icon--cross"></span>
      </button>

      <div className="menu__wrap">
        {Object.values(CATEGORY_MENUS).map((menu) => {
          const isCurrent = !animState && menu.id === currentMenuId;
          const isAnimatingOut = animState && menu.id === animState.fromMenuId;
          const isAnimatingIn = animState && menu.id === animState.toMenuId;
          const isBack = animState?.direction === 'back';

          let levelClasses = 'menu__level';
          if (isCurrent || isAnimatingOut) {
            levelClasses += ' menu__level--current';
          }
          if (isAnimatingOut) {
            levelClasses += isBack
              ? ' animate-outToRight'
              : ' animate-outToLeft';
          }
          if (isAnimatingIn) {
            levelClasses += isBack
              ? ' animate-inFromLeft'
              : ' animate-inFromRight';
          }

          return (
            <ul
              key={menu.id}
              data-menu={menu.id}
              id={menu.id}
              className={levelClasses}
              tabIndex={-1}
              role="menu"
              aria-label={menu.name}
            >
              {menu.items.map((item, pos) => {
                const isSelected =
                  !item.submenu && activeFilter === item.filter;
                const delay =
                  isAnimatingOut || isAnimatingIn
                    ? getItemDelay(pos, Boolean(isBack), animState?.clickPosition)
                    : '0ms';

                return (
                  <li
                    key={`${menu.id}-${item.label}`}
                    className="menu__item"
                    role="menuitem"
                    style={{
                      animationDelay: delay,
                      WebkitAnimationDelay: delay,
                    }}
                  >
                    <a
                      className={`menu__link${
                        isSelected ? ' menu__link--current' : ''
                      }`}
                      data-submenu={item.submenu || undefined}
                      aria-owns={item.submenu || undefined}
                      href={`#${item.filter || item.submenu}`}
                      onClick={(ev) => handleMenuItemClick(ev, item, pos)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;
