'use client';

import { getFilterDisplayName } from '../data/products';

interface NavBarProps {
  activeFilter: string;
  onResetFilter: () => void;
  totalShowing: number;
  totalProducts: number;
}

const NavBar = ({
  activeFilter,
  onResetFilter,
  totalShowing,
  totalProducts,
}: NavBarProps) => {
  const filterLabel = getFilterDisplayName(activeFilter);

  return (
    <header className="bp-header cf">
      <span>
        Storefront{' '}
        <span
          className="bp-icon bp-icon-about"
          data-content="Modernized React & Next.js Storefront with Swiper, React Shuffle Grid, Breadcrumb Categories, Compare Basket & Templated Checkout API."
        ></span>
      </span>
      <h1>
        Filterable Product Grid{' '}
        <span>
          powered by React &amp;{' '}
          <a href="https://swiperjs.com/" target="_blank" rel="noreferrer">
            Swiper
          </a>
        </span>
      </h1>
      {activeFilter && activeFilter !== 'all' && (
        <div className="active-filter-banner" role="status" aria-live="polite">
          <span>
            Showing <strong>{filterLabel}</strong> ({totalShowing} of{' '}
            {totalProducts})
          </span>
          <button
            type="button"
            className="active-filter-reset"
            onClick={onResetFilter}
          >
            <i className="fa fa-times" aria-hidden="true"></i> Reset Filter
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
