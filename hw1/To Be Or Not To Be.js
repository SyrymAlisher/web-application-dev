var expect = function (val) {
    const toBeOrNotToBe = {
        toBe: function (check) {
            if (val === check) {
                return true
            }
            throw new Error("Not Equal")
        },
        notToBe: function (check) {
            if (val !== check) {
                return true
            }
            throw new Error("Equal")
        }
    }
    return toBeOrNotToBe
};
