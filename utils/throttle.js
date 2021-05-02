export default function throttle(fn, delay) {
    var allowSample = true;

    return function (e) {
        if (allowSample) {
            allowSample = false;
            setTimeout(function () { allowSample = true; }, delay);
            fn(e);
        }
    };
}