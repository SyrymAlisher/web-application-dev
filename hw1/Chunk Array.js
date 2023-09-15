const chunk = (array, size, result = [], index = 0) => {
    if (array.length - index) {
        const chunkIndex = Math.floor(index / size);
        if (result[chunkIndex] === undefined) {
            result[chunkIndex] = [];
        }
        result[chunkIndex][index % size] = array[index];
        return chunk(array, size, result, index + 1);
    }
    else {
        return result;
    }
};