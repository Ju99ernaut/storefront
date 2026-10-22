'use client';

import { useState, useRef, useMemo } from 'react';
import BottomBar from '../components/BottomBar';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Cart from '../components/Cart';
import Hamburger from '../components/Hamburger';
import Grid from '../components/Grid';
import CompareBasket from '../components/CompareBasket';
import CompareWrapper from '../components/CompareWrapper';
import { PRODUCTS, Product, CartLineItem } from '../data/products';

const MAX_COMPARE_ITEMS = 3;

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCartAnimating, setIsCartAnimating] = useState<boolean>(false);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);

  // Pre-populate cart with one item from the catalog so checkout can be tested immediately
  const [cartItems, setCartItems] = useState<CartLineItem[]>(() => [
    { ...PRODUCTS[0], quantity: 1 },
  ]);

  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const cartBtnRef = useRef<HTMLButtonElement | null>(null);

  const totalCartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const visibleProductsCount = useMemo(() => {
    if (!activeFilter || activeFilter === 'all') return PRODUCTS.length;
    return PRODUCTS.filter(
      (p) =>
        p.category === activeFilter ||
        (Array.isArray(p.tags) && p.tags.includes(activeFilter))
    ).length;
  }, [activeFilter]);

  const compareIds = useMemo(
    () => compareItems.map((item) => item.id),
    [compareItems]
  );

  const handleAddToCart = (product: Product) => {
    setIsCartAnimating(true);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setTimeout(() => {
      setIsCartAnimating(false);
    }, 450);
  };

  const handleUpdateCartQuantity = (productId: string, nextQty: number) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(99, nextQty) }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleCompare = (product: Product) => {
    setCompareItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        const next = prev.filter((item) => item.id !== product.id);
        if (next.length === 0) {
          setIsCompareOpen(false);
        }
        return next;
      }
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompare = (productId: string) => {
    setCompareItems((prev) => {
      const next = prev.filter((item) => item.id !== productId);
      if (next.length === 0) {
        setIsCompareOpen(false);
      }
      return next;
    });
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
    cartBtnRef.current?.focus();
  };

  return (
    <>
      <CompareBasket
        compareItems={compareItems}
        isCompareOpen={isCompareOpen}
        onRemoveCompare={handleRemoveCompare}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <BottomBar
        ref={cartBtnRef}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        cartCount={totalCartCount}
        isCartAnimating={isCartAnimating}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Hamburger ref={hamburgerRef} onOpen={() => setIsMenuOpen(true)} />

      <SideBar
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <div className={`view${isCompareOpen ? ' view--compare' : ''}`}>
        <NavBar
          activeFilter={activeFilter}
          onResetFilter={() => setActiveFilter('all')}
          totalShowing={visibleProductsCount}
          totalProducts={PRODUCTS.length}
        />
        <Grid
          products={PRODUCTS}
          activeFilter={activeFilter}
          compareIds={compareIds}
          maxCompareReached={compareItems.length >= MAX_COMPARE_ITEMS}
          onToggleCompare={handleToggleCompare}
          onAddToCart={handleAddToCart}
        />
      </div>

      <CompareWrapper
        compareItems={compareItems}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
