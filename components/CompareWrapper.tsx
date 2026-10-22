'use client';

import type { Product } from '../data/products';

interface CompareWrapperProps {
  compareItems: Product[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const CompareWrapper = ({
  compareItems,
  isOpen,
  onClose,
  onAddToCart,
}: CompareWrapperProps) => {
  return (
    <section
      className="compare"
      aria-hidden={!isOpen}
      aria-label="Product comparison overlay"
    >
      {compareItems.map((product) => (
        <div key={product.id} className="compare__item">
          <div className="compare__effect">
            <img src={product.images[0]} alt={product.title} />
            <h3 className="meta__title">{product.title}</h3>
            <span className="meta__brand">{product.brand}</span>
            <span className="meta__price">${product.price}</span>
            <span className="meta__year">{product.subcategory}</span>
            <span className="meta__region">{product.material}</span>
            <span className="meta__varietal">{product.fit}</span>
            <span className="meta__alcohol">{product.care}</span>
            <button
              type="button"
              className="action action--button action--buy compare__buy-btn"
              onClick={() => onAddToCart(product)}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="action__text">Add to cart</span>
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="action action--close"
        onClick={onClose}
        aria-label="Close comparison overlay"
      >
        <i className="fa fa-remove" aria-hidden="true"></i>
        <span className="action__text action__text--invisible">
          Close comparison overlay
        </span>
      </button>
    </section>
  );
};

export default CompareWrapper;
