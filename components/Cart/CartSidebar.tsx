'use client';

import {
  useState,
  useEffect,
  useRef,
  useId,
  FormEvent,
  FocusEvent,
  TouchEvent,
} from 'react';
import styles from '../../styles/Hamburger.module.css';
import s from '../../styles/CartSidebar.module.css';
import CartItem from './CartItem';
import { Bag, Cross, Check } from '../icons';
import type { CartLineItem } from '../../data/products';

interface CheckoutSuccessResponse {
  success: boolean;
  order: {
    orderId: string;
    invoiceNumber: string;
    receiptNumber: string;
    issuedAt: string;
    totals: {
      subTotal: number;
      tax: number;
      shipping: number;
      grandTotal: number;
    };
  };
  documents: {
    invoice: {
      filename: string;
      templateId: string;
      documentId: string;
      mode: string;
      payloadSent: unknown;
    };
    receipt: {
      filename: string;
      templateId: string;
      documentId: string;
      mode: string;
      payloadSent: unknown;
    };
  };
  email: {
    status: string;
    messageId: string;
    to: string;
    subject: string;
    previewUrl: string | null;
    templateId: string;
    attachmentsCount: number;
    attachmentFilenames: string[];
    renderedHtml: string;
    mode: string;
    payloadSent: unknown;
  };
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartLineItem[];
  onUpdateQuantity: (productId: string, nextQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

interface FieldInteractionState {
  hasInteracted: boolean;
  hasBlurred: boolean;
}

const CartSidebar = ({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [orderResult, setOrderResult] =
    useState<CheckoutSuccessResponse | null>(null);
  const [showPayloadPreview, setShowPayloadPreview] = useState(false);

  const [customerName, setCustomerName] = useState('Alex Rivera');
  const [customerEmail, setCustomerEmail] = useState('alex.rivera@example.com');
  const [shippingAddress, setShippingAddress] = useState(
    '742 Evergreen Terrace, Suite 200\nSan Francisco, CA 94107'
  );
  const [ccName, setCcName] = useState('Alex Rivera');
  const [ccNumber, setCcNumber] = useState('4242 4242 4242 4242');
  const [ccExp, setCcExp] = useState('08/29');
  const [ccCsc, setCcCsc] = useState('842');

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dirtyStateRef = useRef<WeakMap<Element, FieldInteractionState>>(
    new WeakMap()
  );
  const touchStartXRef = useRef<number | null>(null);
  const [dragOffsetX, setDragOffsetX] = useState(0);

  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const addressId = `${baseId}-address`;
  const ccNameId = `${baseId}-cc-name`;
  const ccNumberId = `${baseId}-cc-number`;
  const ccExpId = `${baseId}-cc-exp`;
  const ccCscId = `${baseId}-cc-csc`;

  const subTotal = Number(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
  );
  const tax = Number((subTotal * 0.08).toFixed(2));
  const grandTotal = Number((subTotal + tax).toFixed(2));
  const isEmpty = items.length === 0;

  useEffect(() => {
    if (isOpen && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
    if (!isOpen) {
      setStep('cart');
      setOrderResult(null);
      setShowPayloadPreview(false);
      setSubmitError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (items.length > 0 && step === 'success') {
      setStep('cart');
      setOrderResult(null);
      setShowPayloadPreview(false);
    }
  }, [items.length, step]);

  const handleCloseSidebar = () => {
    setStep('cart');
    setOrderResult(null);
    setShowPayloadPreview(false);
    setSubmitError('');
    onClose();
  };

  // Synchronize aria-invalid with :user-invalid and provide fallback for browsers without :user-invalid
  const syncInputValidationState = (
    input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    eventType: 'blur' | 'input'
  ) => {
    if (!input || typeof input.checkValidity !== 'function') return;

    const supportsUserInvalid =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('selector(:user-invalid)');

    if (!supportsUserInvalid) {
      const state = dirtyStateRef.current.get(input) || {
        hasInteracted: false,
        hasBlurred: false,
      };
      if (eventType === 'input') {
        state.hasInteracted = true;
      } else if (eventType === 'blur') {
        state.hasBlurred = true;
      }
      dirtyStateRef.current.set(input, state);

      if (state.hasInteracted && state.hasBlurred) {
        const isValid = input.checkValidity();
        input.classList.toggle(s.userInvalidFallback, !isValid);
        input.classList.toggle(s.userValidFallback, isValid);
        if (!isValid) {
          input.setAttribute('aria-invalid', 'true');
        } else {
          input.removeAttribute('aria-invalid');
        }
      }
      return;
    }

    const isUserInvalid = input.matches(':user-invalid');
    if (isUserInvalid) {
      input.setAttribute('aria-invalid', 'true');
    } else {
      input.removeAttribute('aria-invalid');
    }
  };

  const handleFormBlurCapture = (e: FocusEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement
    ) {
      syncInputValidationState(target, 'blur');
    }
  };

  const handleFormInputCapture = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      )
    ) {
      return;
    }
    target.setCustomValidity('');
    if (target.hasAttribute('aria-invalid')) {
      syncInputValidationState(target, 'input');
    }
  };

  const handleCheckoutSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || isEmpty) return;

    const formEl = formRef.current;
    if (formEl && !formEl.checkValidity()) {
      const firstInvalid = formEl.querySelector<HTMLElement>(':invalid');
      if (firstInvalid) {
        firstInvalid.setAttribute('aria-invalid', 'true');
        firstInvalid.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: customerName.trim(),
            email: customerEmail.trim(),
            address: shippingAddress.trim(),
          },
          payment: {
            cardholderName: ccName.trim(),
            cardNumber: ccNumber.replace(/\s+/g, ''),
            expiry: ccExp.trim(),
          },
          items,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Could not process checkout.');
      }

      setOrderResult(data as CheckoutSuccessResponse);
      setStep('success');
      onClearCart();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : 'We couldn’t process the purchase. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
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
    if (dx > 0) {
      setDragOffsetX(Math.round(dx));
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (touchStartXRef.current === null) return;
    const currentX = e.changedTouches[0]?.clientX ?? 0;
    const dx = currentX - touchStartXRef.current;
    if (dx > 90) {
      handleCloseSidebar();
    }
    touchStartXRef.current = null;
    setDragOffsetX(0);
  };

  const handleResetToShop = () => {
    handleCloseSidebar();
  };

  return (
    <nav
      id="cart-menu"
      className={`menu right${isOpen ? ' menu--open' : ''} ${s.drawerFlex}`}
      style={
        dragOffsetX > 0
          ? { transform: `translate3d(${dragOffsetX}px, 0, 0)` }
          : undefined
      }
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Shopping Cart and Checkout"
    >
      <button
        ref={closeBtnRef}
        type="button"
        className={`${styles.action} action--close-cart`}
        aria-label="Close Cart"
        onClick={handleCloseSidebar}
      >
        <span className="fa-icon icon--cross"></span>
      </button>

      {step === 'success' && orderResult ? (
        <div className={s.successWrap} role="status" aria-live="polite">
          <div className={s.emptyIcon}>
            <Check className={s.absolute} />
          </div>
          <h2 className={s.emptyHeader}>Order Confirmed!</h2>
          <p className={s.emptyText}>
            Order <strong>{orderResult.order.orderId}</strong> has been placed.
            The rendered HTML receipt email and the attached{' '}
            <strong>Invoice</strong> &amp; <strong>Receipt</strong> PDFs have
            been dispatched to <strong>{orderResult.email.to}</strong>.
          </p>

          <div className={s.receiptCard}>
            <div className={s.receiptRow}>
              <span>Order ID</span>
              <strong>{orderResult.order.orderId}</strong>
            </div>
            <div className={s.receiptRow}>
              <span>Amount Paid</span>
              <strong>${orderResult.order.totals.grandTotal.toFixed(2)}</strong>
            </div>
            <div className={s.receiptRow}>
              <span>Delivery Status</span>
              <code>{orderResult.email.status}</code>
            </div>
            <div className={s.receiptRow}>
              <span>Email HTML Template</span>
              <code>{orderResult.email.templateId}</code>
            </div>
            <div className={s.receiptRow}>
              <span>Invoice Attachment</span>
              <code>
                {orderResult.documents.invoice.filename} (
                {orderResult.documents.invoice.templateId})
              </code>
            </div>
            <div className={s.receiptRow}>
              <span>Receipt Attachment</span>
              <code>
                {orderResult.documents.receipt.filename} (
                {orderResult.documents.receipt.templateId})
              </code>
            </div>
            {orderResult.email.previewUrl && (
              <div className={s.receiptRow}>
                <span>Email Preview</span>
                <a
                  href={orderResult.email.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#9fa1ff', textDecoration: 'underline' }}
                >
                  Open Ethereal Email
                </a>
              </div>
            )}
          </div>

          <button
            type="button"
            className={s.secondaryBtn}
            onClick={() => setShowPayloadPreview((prev) => !prev)}
            aria-expanded={showPayloadPreview}
          >
            {showPayloadPreview
              ? 'Hide Template Payloads & Rendered HTML'
              : 'Inspect TemplateId Payloads & Rendered Email HTML'}
          </button>

          {showPayloadPreview && (
            <pre className={s.payloadPreview}>
              {JSON.stringify(
                {
                  invoicePdfApiPost: orderResult.documents.invoice.payloadSent,
                  receiptPdfApiPost: orderResult.documents.receipt.payloadSent,
                  emailTemplateApiPost: orderResult.email.payloadSent,
                  emailTemplateApiResponseHtml: orderResult.email.renderedHtml,
                  attachedFilesSent: orderResult.email.attachmentFilenames,
                },
                null,
                2
              )}
            </pre>
          )}

          <button
            type="button"
            className={s.btn}
            onClick={handleResetToShop}
            style={{ marginTop: '1rem' }}
          >
            Continue Shopping
          </button>
        </div>
      ) : isEmpty ? (
        <div className={s.empty}>
          <span className={s.emptyIcon}>
            <Bag className={s.absolute} />
          </span>
          <h2 className={s.emptyHeader}>Your cart is empty</h2>
          <p className={s.emptyText}>
            Explore our collection of jackets, shirts, dresses, trousers, and
            shoes to add items to your bag.
          </p>
        </div>
      ) : step === 'checkout' ? (
        <div className={s.checkoutScroll}>
          <div className={s.checkoutHeaderRow}>
            <button
              type="button"
              className={s.backToCartBtn}
              onClick={() => {
                setSubmitError('');
                setStep('cart');
              }}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Back to
              Cart
            </button>
            <span className={s.stepBadge} aria-current="step">
              Step 2 of 2: Checkout
            </span>
          </div>

          <h2 className={s.cartHeader}>Checkout &amp; Email Receipt</h2>

          {submitError && (
            <div className={s.errorBanner} role="alert">
              <Cross width={18} height={18} />
              <span>{submitError}</span>
            </div>
          )}

          <form
            ref={formRef}
            method="POST"
            action="/api/checkout"
            className={s.checkoutForm}
            onSubmit={handleCheckoutSubmit}
            onBlurCapture={handleFormBlurCapture}
            onInputCapture={handleFormInputCapture}
            noValidate
          >
            <fieldset className={s.fieldset}>
              <legend className={s.legend}>Customer &amp; Receipt Delivery</legend>

              <div className={s.field}>
                <label htmlFor={nameId} className={s.label}>
                  Full name (required)
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  pattern="[\p{L} \-\.]+"
                  enterKeyHint="next"
                  className={s.input}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  aria-errormessage={`${nameId}-error`}
                />
                <span id={`${nameId}-error`} className={s.errorMsg}>
                  <span aria-hidden="true">&#10060;</span> Please enter your full
                  name.
                </span>
              </div>

              <div className={s.field}>
                <label htmlFor={emailId} className={s.label}>
                  Email address for Invoice &amp; Receipt PDFs (required)
                </label>
                <span id={`${emailId}-hint`} className={s.hint}>
                  Format: you@example.com — Invoice &amp; Receipt PDFs will be
                  attached
                </span>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  className={s.input}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  aria-describedby={`${emailId}-hint`}
                  aria-errormessage={`${emailId}-error`}
                />
                <span id={`${emailId}-error`} className={s.errorMsg}>
                  <span aria-hidden="true">&#10060;</span> Please enter a valid
                  email address.
                </span>
              </div>

              <div className={s.field}>
                <label htmlFor={addressId} className={s.label}>
                  Shipping &amp; Billing Address (required)
                </label>
                <textarea
                  id={addressId}
                  name="address"
                  required
                  rows={2}
                  maxLength={300}
                  autoComplete="shipping street-address"
                  className={s.textarea}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  aria-errormessage={`${addressId}-error`}
                />
                <span id={`${addressId}-error`} className={s.errorMsg}>
                  <span aria-hidden="true">&#10060;</span> Please enter a delivery
                  address.
                </span>
              </div>
            </fieldset>

            <fieldset className={s.fieldset}>
              <legend className={s.legend}>Payment Details</legend>

              <div className={s.field}>
                <label htmlFor={ccNameId} className={s.label}>
                  Name on card (required)
                </label>
                <input
                  id={ccNameId}
                  name="cc-name"
                  type="text"
                  required
                  maxLength={50}
                  autoComplete="cc-name"
                  pattern="[\p{L} \-\.]+"
                  enterKeyHint="next"
                  className={s.input}
                  value={ccName}
                  onChange={(e) => setCcName(e.target.value)}
                  aria-errormessage={`${ccNameId}-error`}
                />
                <span id={`${ccNameId}-error`} className={s.errorMsg}>
                  <span aria-hidden="true">&#10060;</span> Enter the cardholder
                  name.
                </span>
              </div>

              <div className={s.field}>
                <label htmlFor={ccNumberId} className={s.label}>
                  Card number (required)
                </label>
                <span id={`${ccNumberId}-hint`} className={s.hint}>
                  13–19 digits, spaces allowed
                </span>
                <input
                  id={ccNumberId}
                  name="cc-number"
                  type="text"
                  required
                  autoComplete="cc-number"
                  inputMode="numeric"
                  maxLength={19}
                  pattern="[\d ]{13,19}"
                  enterKeyHint="next"
                  className={s.input}
                  value={ccNumber}
                  onChange={(e) => setCcNumber(e.target.value)}
                  aria-describedby={`${ccNumberId}-hint`}
                  aria-errormessage={`${ccNumberId}-error`}
                />
                <span id={`${ccNumberId}-error`} className={s.errorMsg}>
                  <span aria-hidden="true">&#10060;</span> Enter a valid 13–19
                  digit card number.
                </span>
              </div>

              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label htmlFor={ccExpId} className={s.label}>
                    Expiry (required)
                  </label>
                  <span id={`${ccExpId}-hint`} className={s.hint}>
                    Format: MM/YY
                  </span>
                  <input
                    id={ccExpId}
                    name="cc-exp"
                    type="text"
                    required
                    autoComplete="cc-exp"
                    maxLength={5}
                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                    enterKeyHint="next"
                    className={s.input}
                    value={ccExp}
                    onChange={(e) => setCcExp(e.target.value)}
                    aria-describedby={`${ccExpId}-hint`}
                    aria-errormessage={`${ccExpId}-error`}
                  />
                  <span id={`${ccExpId}-error`} className={s.errorMsg}>
                    <span aria-hidden="true">&#10060;</span> Use MM/YY.
                  </span>
                </div>

                <div className={s.field}>
                  <label htmlFor={ccCscId} className={s.label}>
                    Security code (required)
                  </label>
                  <span id={`${ccCscId}-hint`} className={s.hint}>
                    3 or 4 digits
                  </span>
                  <input
                    id={ccCscId}
                    name="cc-csc"
                    type="text"
                    required
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    maxLength={4}
                    pattern="[0-9]{3,4}"
                    enterKeyHint="done"
                    className={s.input}
                    value={ccCsc}
                    onChange={(e) => setCcCsc(e.target.value)}
                    aria-describedby={`${ccCscId}-hint`}
                    aria-errormessage={`${ccCscId}-error`}
                  />
                  <span id={`${ccCscId}-error`} className={s.errorMsg}>
                    <span aria-hidden="true">&#10060;</span> 3–4 digits.
                  </span>
                </div>
              </div>
            </fieldset>

            <div className={s.checkoutSummaryMini}>
              <div className={s.total}>
                <span>
                  Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)}{' '}
                  items)
                </span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className={s.total}>
                <span>Taxes (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className={s.grandTotal} style={{ marginBottom: '1rem' }}>
                <span>Total Due</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className={`${s.btn}${isSubmitting ? ` ${s.loading}` : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Rendering Templates & Sending Email...'
                : `Pay $${grandTotal.toFixed(2)} & Email Receipt`}
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className={s.cartContainer}>
            <div className={s.cartHeaderBar}>
              <h2 className={s.cartHeader} onClick={onClose}>
                My Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
              <button
                type="button"
                className={s.clearCartBtn}
                onClick={onClearCart}
              >
                Clear All
              </button>
            </div>
            <ul className={s.listContainer}>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </ul>
          </div>

          <div className={s.totalsContainer}>
            <div>
              <ul className={s.padding}>
                <li className={s.total}>
                  <span>Subtotal</span>
                  <span>${subTotal.toFixed(2)}</span>
                </li>
                <li className={s.total}>
                  <span>Taxes (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </li>
                <li className={s.total}>
                  <span>Estimated Shipping</span>
                  <span className={s.free}>FREE</span>
                </li>
              </ul>
              <div className={s.grandTotal}>
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              className={s.btn}
              onClick={() => setStep('checkout')}
            >
              Proceed to Checkout (${grandTotal.toFixed(2)})
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default CartSidebar;
