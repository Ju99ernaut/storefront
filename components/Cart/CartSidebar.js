import styles from '../../styles/Hamburger.module.css';
import s from '../../styles/CartSidebar.module.css';
import Link from 'next/link'
import CartItem from './CartItem';
import { Bag, Cross, Check } from '../icons'

const CartSidebar = () => {
    const isLoading = false;
    const isEmpty = false;
    const error = false;
    const success = false;
    const subTotal = 100;
    const total = 100;

    const handleClose = () => { };

    //{data.lineItems.map((item) => (
    //    <CartItem
    //    key={item.id}
    //    item={item}
    //    currencyCode={data.currency.code}
    //    />
    //))}

    return (
        <nav id="cart-menu" className="menu right">
            <button className={`${styles.action} action--close-cart`} aria-label="Close Menu"><span className="fa-icon icon--cross"></span></button>

            {isLoading || isEmpty ? (
                <div className={s.empty}>
                    <span className={s.emptyIcon}>
                        <Bag className={s.absolute} />
                    </span>
                    <h2 className={s.emptyHead}>
                        Your cart is empty
                    </h2>
                    <p className={s.emptyText}>
                        Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
                    </p>
                </div>
            ) : error ? (
                <div className={s.empty}>
                    <span className={s.emptyIcon}>
                        <Cross className={s.absolute} width={24} height={24} />
                    </span>
                    <h2 className={s.emptyHead}>
                        Error!
                    </h2>
                    <p className={s.emptyText}>
                        We couldn’t process the purchase. Please check your card information
                        and try again.
                    </p>
                </div>
            ) : success ? (
                <div className={s.empty}>
                    <span className={s.emptyIcon}>
                        <Check className={s.absolute} />
                    </span>
                    <h2 className={s.emptyHead}>
                        Thank you!
                    </h2>
                </div>
            ) : (
                <>
                    <div className={s.cartContainer}>
                        <Link href="/cart">
                            <h2 className={s.cartHeader} onClick={handleClose}>
                                My Cart
                            </h2>
                        </Link>
                        <ul className={s.listContainer}>
                            <CartItem />
                        </ul>
                    </div>

                    <div className={s.totalsContainer}>
                        <div>
                            <ul className={s.padding}>
                                <li className={s.total}>
                                    <span>Subtotal</span>
                                    <span>${subTotal}</span>
                                </li>
                                <li className={s.total}>
                                    <span>Taxes</span>
                                    <span>Calculated at checkout</span>
                                </li>
                                <li className={s.total}>
                                    <span>Estimated Shipping</span>
                                    <span className={s.free}>FREE</span>
                                </li>
                            </ul>
                            <div className={s.grandTotal}>
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>
                        <a className={s.btn} href="/checkout">
                            Checkout
                        </a>
                    </div>
                </>
            )}
        </nav>
    );
}

export default CartSidebar;