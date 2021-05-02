const BottomBar = () => {
    return (
        <div className="bar">
            <div className="filter">
                <span className="filter__label">Filter: </span>
                <button className="action filter__item filter__item--selected" data-filter="all">All</button>
                <button className="action filter__item" data-filter="jackets"><i className="icon icon--jacket"></i><span className="action__text">Jackets</span></button>
                <button className="action filter__item" data-filter="shirts"><i className="icon icon--shirt"></i><span className="action__text">Shirts</span></button>
                <button className="action filter__item" data-filter="dresses"><i className="icon icon--dress"></i><span className="action__text">Dresses</span></button>
                <button className="action filter__item" data-filter="trousers"><i className="icon icon--trousers"></i><span className="action__text">Trousers</span></button>
                <button className="action filter__item" data-filter="shoes"><i className="icon icon--shoe"></i><span className="action__text">Shoes</span></button>
            </div>
            <button className="cart">
                <i className="cart__icon fa fa-shopping-cart"></i>
                <span className="text-hidden">Shopping cart</span>
                <span className="cart__count">0</span>
            </button>
        </div>
    );
}

export default BottomBar;