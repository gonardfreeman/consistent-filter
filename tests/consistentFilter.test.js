const consistentFilter = require('../src/index').consistentFilter;

test('easy-case', () => {
    const initialArr = [
        { id: 't1', ts: 1 },
        { id: 't2', ts: 1 },
        { id: 't1', ts: 2 },
        { id: 't2', ts: 2 },
        { id: 't1', ts: 3 },
        { id: 't2', ts: 3 },
        { id: 't1', ts: 4 },
        { id: 't2', ts: 4 }
    ];
    const expectedObj = {
        1: { id: 't1', ts: 1 },
        2: { id: 't2', ts: 2 },
        3: { id: 't1', ts: 3 },
        4: { id: 't2', ts: 4 }
    };
    expect(consistentFilter(initialArr)).toEqual(expectedObj);
});

test('stronger-case', () => {
    const initialArr = [
        { id: 't1', ts: 1 }, //gCounter = 0, cur = 1
        { id: 't2', ts: 1 }, //gCounter = 0, cur = 1
        { id: 't1', ts: 2 }, //gCounter = 1, cur = 1
        { id: 't2', ts: 2 }, //gCounter = 2, cur = 1
        { id: 't1', ts: 3 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 3 }, //gCounter = 0, cur = 0
        { id: 't1', ts: 4 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 4 }, //gCounter = 0, cur = 0
        { id: 't1', ts: 5 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 5 }, //gCounter = 0, cur = 0
        { id: 't1', ts: 6 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 6 }, //gCounter = 0, cur = 0
        { id: 't1', ts: 7 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 7 }, //gCounter = 0, cur = 0
        { id: 't3', ts: 7 }, //gCounter = 0, cur = 0
        { id: 't1', ts: 8 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 8 }, //gCounter = 0, cur = 0
        { id: 't3', ts: 8 }, //gCounter = 0, cur = 0
        { id: 't1', ts: 9 }, //gCounter = 0, cur = 0
        { id: 't2', ts: 9 }, //gCounter = 0, cur = 0
        { id: 't3', ts: 9 } //gCounter = 0, cur = 0
    ];
    const expectedObj = {
        1: { id: 't1', ts: 1 },
        2: { id: 't2', ts: 2 },
        3: { id: 't1', ts: 3 },
        4: { id: 't2', ts: 4 },
        5: { id: 't1', ts: 5 },
        6: { id: 't2', ts: 6 },
        7: { id: 't1', ts: 7 },
        8: { id: 't2', ts: 8 },
        9: { id: 't3', ts: 9 }
    };
    expect(consistentFilter(initialArr)).toEqual(expectedObj);
});

test('ultra-strong-case', () => {
    const initialArr = [
        { id: 't1', ts: 1 },
        { id: 't2', ts: 1 },
        { id: 't3', ts: 1 },
        { id: 't1', ts: 2 },
        { id: 't2', ts: 2 },
        { id: 't1', ts: 3 },
        { id: 't2', ts: 3 },
        { id: 't1', ts: 4 },
        { id: 't2', ts: 4 }
    ];
    const expectedObj = {
        1: { id: 't1', ts: 1 },
        2: { id: 't2', ts: 2 },
        3: { id: 't1', ts: 3 },
        4: { id: 't2', ts: 4 }
    };
    expect(consistentFilter(initialArr)).toEqual(expectedObj);
});
