/**
 * @typedef oResultEl
 * @type {Object}
 * @property {string} id id of record
 * @property {number} time integer
 */
/**
 * @typedef oResult
 * @type {Object}
 * @property {oResultEl}
 */

/**
 * Filters array by unique elements.
 * @param { {id: string, time: number }[] } arr array of object to filter
 * @returns { oResult } filtered unique object
 */
function consistentFilter(arr) {
    var oResult = {},
        nCurrPos = 0,
        aGroupedValues = [],
        nMax;
    var memoTime,
        aTemp = [];
    for (var nI = 0; nI < arr.length; nI++) {
        var oSlot = arr[nI];
        if (memoTime && memoTime !== oSlot.time) {
            aGroupedValues.push(aTemp);
            aTemp = [];
        }
        aTemp.push(oSlot);
        memoTime = oSlot.time;
        if (nI === arr.length - 1) {
            aGroupedValues.push(aTemp);
        }
    }
    for (var nJ = 0; nJ < aGroupedValues.length; nJ++) {
        var aSlots = aGroupedValues[nJ];
        nMax = aSlots.length;
        oResult[aSlots[nCurrPos].time] = aSlots[nCurrPos];
        nCurrPos++;
        if (nCurrPos >= nMax) {
            nCurrPos = 0;
        }
        if (nMax !== aSlots.length) {
            nCurrPos = 0;
        }
    }
    return oResult;
}
module.exports = { consistentFilter };
