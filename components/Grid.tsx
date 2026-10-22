'use client';

import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';
import type { Product } from '../data/products';

interface ItemPosition {
  visible: boolean;
  x: number;
  y: number;
  width: number;
}

interface GridLayoutState {
  height: number;
  items: Record<string, ItemPosition>;
}

interface GridProps {
  products: Product[];
  activeFilter: string;
  compareIds: string[];
  maxCompareReached: boolean;
  onToggleCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const Grid = ({
  products,
  activeFilter,
  compareIds,
  maxCompareReached,
  onToggleCompare,
  onAddToCart,
}: GridProps) => {
  const gridRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [layout, setLayout] = useState<GridLayoutState>({
    height: 800,
    items: {},
  });

  const isProductVisible = useCallback(
    (product: Product) => {
      if (!activeFilter || activeFilter === 'all') return true;
      return (
        product.category === activeFilter ||
        (Array.isArray(product.tags) && product.tags.includes(activeFilter))
      );
    },
    [activeFilter]
  );

  const computeShuffleLayout = useCallback(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const containerWidth = gridEl.clientWidth;
    if (!containerWidth) return;

    const vw =
      typeof window !== 'undefined' ? window.innerWidth : containerWidth;
    let numCols = 5;
    if (vw <= 400) {
      numCols = 1;
    } else if (vw <= 800) {
      numCols = 2;
    } else if (vw <= 1040) {
      numCols = 3;
    }

    const colWidth = containerWidth / numCols;
    const colHeights = new Array<number>(numCols).fill(24);
    const nextItems: Record<string, ItemPosition> = {};

    products.forEach((product) => {
      const el = itemRefs.current[product.id];
      const visible = isProductVisible(product);
      const span = numCols === 5 && product.size === 'large' ? 2 : 1;
      const itemWidth = colWidth * span;
      const itemHeight = el ? el.offsetHeight || 340 : 340;

      if (!visible) {
        const prev = layout.items[product.id];
        nextItems[product.id] = {
          visible: false,
          x: prev ? prev.x : 0,
          y: prev ? prev.y : 0,
          width: itemWidth,
        };
        return;
      }

      let bestCol = 0;
      let minMaxY = Infinity;
      for (let c = 0; c <= numCols - span; c++) {
        let regionMaxY = 0;
        for (let s = 0; s < span; s++) {
          regionMaxY = Math.max(regionMaxY, colHeights[c + s]);
        }
        if (regionMaxY < minMaxY) {
          minMaxY = regionMaxY;
          bestCol = c;
        }
      }

      const x = Math.round(bestCol * colWidth);
      const y = Math.round(minMaxY);

      for (let s = 0; s < span; s++) {
        colHeights[bestCol + s] = y + itemHeight;
      }

      nextItems[product.id] = {
        visible: true,
        x,
        y,
        width: itemWidth,
      };
    });

    const maxHeight = Math.max(320, ...colHeights) + 120;
    setLayout({ height: maxHeight, items: nextItems });
  }, [products, isProductVisible]);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      computeShuffleLayout();
    }, 60);
    return () => clearTimeout(timer);
  }, [computeShuffleLayout]);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const handleResize = () => {
      computeShuffleLayout();
    };

    window.addEventListener('resize', handleResize);
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        computeShuffleLayout();
      });
      observer.observe(gridEl);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, [computeShuffleLayout]);

  return (
    <section
      ref={gridRef}
      className={`grid${!isLoaded ? ' grid--loading' : ''}`}
      style={{
        height: isLoaded ? `${layout.height}px` : undefined,
        transition: 'height 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <img
        className="grid__loader"
        src="/images/grid.svg"
        width="60"
        alt="Loader image"
      />
      <div className="grid__sizer"></div>

      {products.map((product) => {
        const isCompared = compareIds.includes(product.id);
        const itemLayout = layout.items[product.id];
        const visible = itemLayout
          ? itemLayout.visible
          : isProductVisible(product);

        const itemStyle: CSSProperties | undefined =
          isLoaded && itemLayout
            ? {
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${itemLayout.width}px`,
                transform: `translate3d(${itemLayout.x}px, ${
                  itemLayout.y
                }px, 0) scale(${visible ? 1 : 0.001})`,
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'auto' : 'none',
                visibility: visible ? 'visible' : 'hidden',
                transition:
                  'transform 600ms cubic-bezier(0.4, 0, 0.2, 1), opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), visibility 600ms',
              }
            : undefined;

        return (
          <div
            key={product.id}
            ref={(el) => {
              itemRefs.current[product.id] = el;
            }}
            className={`grid__item${
              product.size === 'large' ? ' grid__item--size-a' : ''
            } ${product.category}`}
            style={itemStyle}
            aria-hidden={!visible}
          >
            <Swiper
              className={`swiper-container slider${
                isCompared ? ' product--selected' : ''
              }`}
              modules={[Pagination, EffectCoverflow, Zoom]}
              effect="coverflow"
              grabCursor={true}
              zoom={true}
              autoHeight={true}
              pagination={{ clickable: true }}
              onAfterInit={() => computeShuffleLayout()}
            >
              {product.images.map((imgSrc, idx) => (
                <SwiperSlide
                  key={`${product.id}-slide-${idx}`}
                  className="slider__item"
                >
                  <div className="swiper-zoom-container">
                    <img
                      src={imgSrc}
                      alt={`${product.title} view ${idx + 1}`}
                      onLoad={() => computeShuffleLayout()}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="meta">
              <h3 className="meta__title">{product.title}</h3>
              <span className="meta__brand">
                {product.brand} &middot; {product.subcategory}
              </span>
              <span className="meta__price">${product.price}</span>
            </div>

            <button
              type="button"
              className="action action--button action--buy"
              onClick={() => onAddToCart(product)}
              aria-label={`Add ${product.title} to cart`}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span className="text-hidden">Add to cart</span>
            </button>

            <label
              className="action action--compare-add"
              title={
                !isCompared && maxCompareReached
                  ? 'Maximum 3 products can be compared at once'
                  : 'Add to compare'
              }
            >
              <input
                className="check-hidden"
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare(product)}
              />
              <i className="fa fa-plus" aria-hidden="true"></i>
              <i className="fa fa-check" aria-hidden="true"></i>
              <span className="action__text action__text--invisible">
                Add to compare
              </span>
            </label>
          </div>
        );
      })}
    </section>
  );
};

export default Grid;
