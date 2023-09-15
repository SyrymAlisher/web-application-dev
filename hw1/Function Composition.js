
function compose(functions) {
    if (functions.length === 0) {
        return function(x) {
            return x;
        };
    }

    return function(x) {
        let result = x;
        for (let i = functions.length - 1; i >= 0; i--) {
            result = functionsi;
        }
        return result;
    };
}
