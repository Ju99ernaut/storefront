import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash, Plus, Minus } from '../icons';
import s from '../../styles/CartItem.module.css';

const CartItem = () => {
    const item = {
        name: 'Shirt',
        path: '',
        variant: {
            image: {
                url: 'images/shirt.png',
                alt: 'shirt'
            }
        }
    }

    const closeSidebarIfPresent = () => { };
    const increaseQuantity = () => { };
    const price = 100;
    const quantity = 1;
    const handleBlur = () => { };
    const handleQuantity = () => { };
    const handleRemove = () => { };
    const options = [];

    //cn('flex flex-row space-x-8 py-8', {
    //    'opacity-75 pointer-events-none': removing,
    //})}
    //{...rest}

    return (
        <li className={s.itemContainer}>
            <div className={s.productImageContainer}>
                <Link href={`/product/${item.path}`}>
                    <Image
                        onClick={() => closeSidebarIfPresent()}
                        className={s.productImage}
                        width={150}
                        height={150}
                        src={item.variant.image.url}
                        alt={item.variant.image.altText}
                        unoptimized
                    />
                </Link>
            </div>
            <div className={s.variantContainer}>
                <Link href={`/product/${item.path}`}>
                    <span
                        className={s.variantName}
                        onClick={() => closeSidebarIfPresent()}
                    >
                        {item.name}
                    </span>
                </Link>
                {options && options.length > 0 ? (
                    <div className="">
                        {options.map((option, i) => (
                            <span
                                key={`${item.id}-${option.name}`}
                                className={s.variantValue}
                            >
                                {option.value}
                                {i === options.length - 1 ? '' : ', '}
                            </span>
                        ))}
                    </div>
                ) : null}
                <div className={s.quantityContainer}>
                    <button className={s.btn} type="button" onClick={() => increaseQuantity(-1)}>
                        <Minus width={18} height={18} />
                    </button>
                    <label>
                        <input
                            type="number"
                            max={99}
                            min={0}
                            className={s.quantity}
                            value={quantity}
                            onChange={handleQuantity}
                            onBlur={handleBlur}
                        />
                    </label>
                    <button className={s.btn} type="button" onClick={() => increaseQuantity(1)}>
                        <Plus width={18} height={18} />
                    </button>
                </div>
            </div>
            <div className={s.priceContainer}>
                <span>${price}</span>
                <button
                    className={s.removeButton}
                    onClick={handleRemove}
                >
                    <Trash />
                </button>
            </div>
        </li>
    );
}

export default CartItem;