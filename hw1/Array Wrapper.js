class ArrayWrapper {
    constructor(nums) {
        this.nums = nums;
    }

    valueOf() {
        return this.nums.reduceRight((sum, num) => sum + num, 0);
    }

    toString() {
        return `[${this.nums.reduceRight((str, num, index) => {
            if (index === this.nums.length - 1) {
                return String(num) + str;
            } else {
                return String(num) + ',' + str;
            }
        }, '')}]`;
    }
}
