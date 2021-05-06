export default function menuTouch(menuEl, openEl, open, close, threshold, invert = false, mouse = false) {
    function unify(e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    }

    let x0 = null;
    function lock(e) {
        x0 = unify(e).clientX;
    }

    function move(e) {
        if (x0 || x0 === 0) {
            const dx = unify(e).clientX - x0,
                s = Math.sign(dx),
                f = +(s * dx / menuEl.getBoundingClientRect().width).toFixed(2); // Calculate movement %
            // Only open if greater than threshold
            if (s > 0 && f > threshold) {
                !invert && open();
                invert && close();
                x0 = null;
            } else if (f > threshold) {
                !invert && close();
                invert && open();
                x0 = null;
            }
        }
        menuEl.style.transform = '';
        menuEl.style.webkitTransform = '';
    }

    function drag(e) {
        e.preventDefault();
        const dx = unify(e).clientX - x0,
            s = Math.sign(dx);
        if ((x0 || x0 == 0) && ((!invert && s < 0) || (invert && s > 0))) {
            const tx = Math.round(dx);
            menuEl.style.transform = `translate3d(${tx}px, 0, 0)`;
            menuEl.style.webkitTransform = `translate3d(${tx}px, 0, 0)`;
        }
    }

    openEl.addEventListener('touchstart', lock);
    openEl.addEventListener('touchend', move);
    openEl.addEventListener('touchmove', drag, false);

    menuEl.addEventListener('touchstart', lock);
    menuEl.addEventListener('touchend', move);
    menuEl.addEventListener('touchmove', drag, false);

    if (mouse) {
        openEl.addEventListener('mousedown', lock);
        openEl.addEventListener('mouseup', move);
        openEl.addEventListener('mousemove', drag, false);

        menuEl.addEventListener('mousedown', lock);
        menuEl.addEventListener('mouseup', move);
        menuEl.addEventListener('mousemove', drag, false);
    }
}