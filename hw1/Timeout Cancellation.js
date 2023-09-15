var cancellable = function(fn, args, t) {
    let cancelled = false;
    let timer;

    const cancelFn = () => {
        cancelled = true;
        clearTimeout(timer);
    };

    timer = setTimeout(() => {
        if (!cancelled) {
            fn(...args);
        }
    }, t);

    return cancelFn;
};