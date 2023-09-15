var map = function(arr, fn) {
    const transformedArray = [];

    for (let i = 0; i < arr.length; i++) {
        const transformedValue = fn(arr[i], i);
        transformedArray.push(transformedValue);
    }
    return transformedArray;
};