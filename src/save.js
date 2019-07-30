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
 * @param {number} nMax number of max elements in group (in whole arr)
 * @returns { oResult } filtered unique object
 */
function consistentFilter(arr, nMax) {
    var oResult = {};
    var oCheck = {
        nTime: null,
        nGroupCounter: 0,
        id: null,
        nMax: nMax
    };
    var nCurrentGroupEl = 0;
    for (var nI = 0; nI < arr.length; nI++) {
        var oSlot = arr[nI];
        if (nCurrentGroupEl > oCheck.nMax) {
            nCurrentGroupEl = 0;
        }
        //no value added -> add value
        if (oResult[oSlot.time] === undefined) {
            if (nCurrentGroupEl === oCheck.nGroupCounter) {
                oResult[oSlot.time] = oSlot;
                oCheck = Object.assign({}, oCheck, {
                    nTime: oSlot.time,
                    id: oSlot.id,
                    nGroupCounter: 0
                });
                nCurrentGroupEl = 0;
                continue;
            }
            oCheck = Object.assign({}, oCheck, {
                nGroupCounter: oCheck.nGroupCounter + 1
            });
            continue;
        }
        //if same time -> skip
        if (oSlot.time === oCheck.nTime) {
            nCurrentGroupEl++;
            continue;
        }
    }
    return oResult;
}
function consistentFilter1(arr) {
    var oResult = {},
        nCurrPos = 0,
        nPrevLength = 0,
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
        console.log('nCurrPos', nCurrPos);
        console.log('aSlots[nCurrPos].time', aSlots[nCurrPos].time);
        if (nMax !== aSlots.length) {
            nCurrPos = 0;
        }
        nMax = aSlots.length;
        oResult[aSlots[nCurrPos].time] = aSlots[nCurrPos];
        nCurrPos++;
        if (nCurrPos >= nMax) {
            nCurrPos = 0;
        }
    }
    return oResult;
}
