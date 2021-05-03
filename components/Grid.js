const Grid = () => {
    return (
        <section className="grid grid--loading">
            <img className="grid__loader" src="images/grid.svg" width="60" alt="Loader image" />
            <div className="grid__sizer"></div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item dresses">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item grid__item--size-a shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item trousers">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item grid__item--size-a jackets">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item dresses">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item trousers">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item jackets">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item grid__item--size-a dresses">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item trousers">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item jackets">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item dresses">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item grid__item--size-a trousers">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item jackets">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item dresses">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shirts">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shirt.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item trousers">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item jackets">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item grid__item--size-a dresses">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/dress.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item trousers">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/trousers.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item shoes">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/shoe.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
            <div className="grid__item jackets">
                <div className="swiper-container slider">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                        <div className="swiper-slide slider__item"><img src="images/jacket.png" alt="Dummy" /></div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                <div className="meta">
                    <h3 className="meta__title">Dummy Product</h3>
                    <span className="meta__brand">Dummy Brand</span>
                    <span className="meta__price">$99</span>
                </div>
                <button class="action action--button action--buy"><i class="fa fa-shopping-cart"></i><span class="text-hidden">Add to cart</span></button>
                <label class="action action--compare-add"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label>
            </div>
        </section>
    );
}

export default Grid;