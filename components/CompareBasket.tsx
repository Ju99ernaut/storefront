'use client';

import type { Product } from '../data/products';

const MAX_COMPARE_ITEMS = 3;

interface CompareBasketProps {
  compareItems: Product[];
  isCompareOpen: boolean;
  onRemoveCompare: (productId: string) => void;
  onOpenCompare: () => void;
}

const CompareBasket = ({
  compareItems,
  isCompareOpen,
  onRemoveCompare,
  onOpenCompare,
}: CompareBasketProps) => {
  const isActive = compareItems.length > 0 && !isCompareOpen;
  const isFull = compareItems.length >= MAX_COMPARE_ITEMS;
  const canCompare = compareItems.length >= 2;

  return (
    <div
      className={`compare-basket${isActive ? ' compare-basket--active' : ''}${
        isFull ? ' compare-basket--full' : ''
      }`}
      aria-label="Product comparison basket"
    >
      {compareItems.map((product) => (
        <div key={product.id} className="product-icon" data-idx={product.id}>
          <img src={product.images[0]} alt={product.title} />
          <button
            type="button"
            className="action action--remove"
            onClick={() => onRemoveCompare(product.id)}
            aria-label={`Remove ${product.title} from comparison`}
          >
            <i className="fa fa-remove" aria-hidden="true"></i>
            <span className="action__text action__text--invisible">
              Remove product
            </span>
          </button>
        </div>
      ))}
      <button
        type="button"
        className="action action--button action--compare"
        onClick={() => {
          if (canCompare) {
            onOpenCompare();
          }
        }}
        disabled={!canCompare}
        style={
          canCompare
            ? {
                backgroundColor: '#494BC7',
                color: '#fff',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }
            : undefined
        }
      >
        <i className="fa fa-check" aria-hidden="true"></i>
        <span className="action__text">
          Compare{compareItems.length > 0 ? ` (${compareItems.length})` : ''}
        </span>
      </button>
    </div>
  );
};

export default CompareBasket;
