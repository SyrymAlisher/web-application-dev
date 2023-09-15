var cancellable = function(fn, args, t) {
    const intervalId = setInterval(() => {
        fn(...args);
    }, t);

    const cancelFn = function() {
        clearInterval(intervalId);
    };

    fn(...args); 
    return cancelFn;
};
