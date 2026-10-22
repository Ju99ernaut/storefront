'use client';

import { forwardRef } from 'react';
import { BOTTOM_BAR_FILTERS, getMainCategoryForFilter } from '../data/products';

interface BottomBarProps {
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  cartCount: number;
  isCartAnimating: boolean;
  onOpenCart: () => void;
}

const BottomBar = forwardRef<HTMLButtonElement, BottomBarProps>(
  (
    { activeFilter, onSelectFilter, cartCount, isCartAnimating, onOpenCart },
    cartBtnRef
  ) => {
    const activeMainCategory = getMainCategoryForFilter(activeFilter);

    return (
      <div className="bar">
        <div
          className="filter"
          role="toolbar"
          aria-label="Product category filters"
        >
          <span className="filter__label">Filter: </span>
          {BOTTOM_BAR_FILTERS.map((item) => {
            const isSelected =
              item.id === 'all'
                ? activeFilter === 'all'
                : activeFilter === item.id || activeMainCategory === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`action filter__item${
                  isSelected ? ' filter__item--selected' : ''
                }`}
                data-filter={item.id}
                aria-pressed={isSelected}
                onClick={() => onSelectFilter(item.id)}
              >
                {item.icon && (
                  <i className={`icon ${item.icon}`} aria-hidden="true"></i>
                )}
                <span className={item.icon ? 'action__text' : undefined}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <button
          ref={cartBtnRef}
          type="button"
          className={`cart${isCartAnimating ? ' cart--animate' : ''}`}
          onClick={onOpenCart}
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <i className="cart__icon fa fa-shopping-cart" aria-hidden="true"></i>
          <span className="text-hidden">Shopping cart</span>
          <span className="cart__count">{cartCount}</span>
        </button>
      </div>
    );
  }
);

BottomBar.displayName = 'BottomBar';

export default BottomBar;
