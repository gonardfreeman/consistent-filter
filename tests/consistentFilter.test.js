const consistentFilter = require('../src/index').consistentFilter;

test('easy-case', () => {
    const initialArr = [
        { id: 't1', time: 1 },
        { id: 't2', time: 1 },
        { id: 't1', time: 2 },
        { id: 't2', time: 2 },
        { id: 't1', time: 3 },
        { id: 't2', time: 3 },
        { id: 't1', time: 4 },
        { id: 't2', time: 4 }
    ];
    const expectedObj = {
        1: { id: 't1', time: 1 },
        2: { id: 't2', time: 2 },
        3: { id: 't1', time: 3 },
        4: { id: 't2', time: 4 }
    };
    expect(consistentFilter(initialArr)).toEqual(expectedObj);
});

test('stronger-case', () => {
    const initialArr = [
        { id: 't1', time: 1 }, //gCounter = 0, cur = 1
        { id: 't2', time: 1 }, //gCounter = 0, cur = 1
        { id: 't1', time: 2 }, //gCounter = 1, cur = 1
        { id: 't2', time: 2 }, //gCounter = 2, cur = 1
        { id: 't1', time: 3 }, //gCounter = 0, cur = 0
        { id: 't2', time: 3 }, //gCounter = 0, cur = 0
        { id: 't1', time: 4 }, //gCounter = 0, cur = 0
        { id: 't2', time: 4 }, //gCounter = 0, cur = 0
        { id: 't1', time: 5 }, //gCounter = 0, cur = 0
        { id: 't2', time: 5 }, //gCounter = 0, cur = 0
        { id: 't1', time: 6 }, //gCounter = 0, cur = 0
        { id: 't2', time: 6 }, //gCounter = 0, cur = 0
        { id: 't1', time: 7 }, //gCounter = 0, cur = 0
        { id: 't2', time: 7 }, //gCounter = 0, cur = 0
        { id: 't3', time: 7 }, //gCounter = 0, cur = 0
        { id: 't1', time: 8 }, //gCounter = 0, cur = 0
        { id: 't2', time: 8 }, //gCounter = 0, cur = 0
        { id: 't3', time: 8 }, //gCounter = 0, cur = 0
        { id: 't1', time: 9 }, //gCounter = 0, cur = 0
        { id: 't2', time: 9 }, //gCounter = 0, cur = 0
        { id: 't3', time: 9 } //gCounter = 0, cur = 0
    ];
    const expectedObj = {
        1: { id: 't1', time: 1 },
        2: { id: 't2', time: 2 },
        3: { id: 't1', time: 3 },
        4: { id: 't2', time: 4 },
        5: { id: 't1', time: 5 },
        6: { id: 't2', time: 6 },
        7: { id: 't1', time: 7 },
        8: { id: 't2', time: 8 },
        9: { id: 't3', time: 9 }
    };
    expect(consistentFilter(initialArr)).toEqual(expectedObj);
});

test('ultra-strong-case', () => {
    const initialArr = [
        { id: 't1', time: 1 },
        { id: 't2', time: 1 },
        { id: 't3', time: 1 },
        { id: 't1', time: 2 },
        { id: 't2', time: 2 },
        { id: 't1', time: 3 },
        { id: 't2', time: 3 },
        { id: 't1', time: 4 },
        { id: 't2', time: 4 }
    ];
    const expectedObj = {
        1: { id: 't1', time: 1 },
        2: { id: 't2', time: 2 },
        3: { id: 't1', time: 3 },
        4: { id: 't2', time: 4 }
    };
    const test = consistentFilter(initialArr);
    console.log(test);
    expect(consistentFilter(initialArr)).toEqual(expectedObj);
});
