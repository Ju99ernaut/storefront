'use client';

import type { ChangeEvent } from 'react';
import Image from 'next/image';
import { Trash, Plus, Minus } from '../icons';
import s from '../../styles/CartItem.module.css';
import type { CartLineItem } from '../../data/products';

interface CartItemProps {
  item: CartLineItem;
  onUpdateQuantity: (productId: string, nextQty: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { id, title, brand, subcategory, price, quantity, images } = item;
  const imageUrl = images && images[0] ? images[0] : '/images/shirt.png';

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!Number.isNaN(val)) {
      onUpdateQuantity(id, val);
    }
  };

  return (
    <li className={s.itemContainer}>
      <div className={s.productImageContainer}>
        <Image
          className={s.productImage}
          width={150}
          height={150}
          src={imageUrl}
          alt={title}
          unoptimized
        />
      </div>
      <div className={s.variantContainer}>
        <span className={s.variantName}>{title}</span>
        <span className={s.variantValue}>
          {brand} &middot; {subcategory}
        </span>

        <div className={s.quantityContainer}>
          <button
            className={s.btn}
            type="button"
            aria-label={`Decrease quantity of ${title}`}
            onClick={() => onUpdateQuantity(id, quantity - 1)}
          >
            <Minus width={18} height={18} />
          </button>
          <label>
            <span className="text-hidden">Quantity for {title}</span>
            <input
              type="number"
              max={99}
              min={1}
              className={s.quantity}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <button
            className={s.btn}
            type="button"
            aria-label={`Increase quantity of ${title}`}
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus width={18} height={18} />
          </button>
        </div>
      </div>
      <div className={s.priceContainer}>
        <span>${(price * quantity).toFixed(2)}</span>
        <button
          type="button"
          className={s.removeButton}
          onClick={() => onRemove(id)}
          aria-label={`Remove ${title} from cart`}
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
