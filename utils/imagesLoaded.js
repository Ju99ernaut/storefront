//check if images have loaded
export default function imagesLoaded(el, clb) {
    const imgs = el.querySelectorAll('img');
    imgs.forEach(function (img) {
        loadImage(img);
    });
    clb && clb();
}

function loadImage(el) {
    const src = el.getAttribute('src');
    if (!el.complete) {
        if (src) {
            const image = new Image();
            image.src = src
        }
    }
}