const mockObject = {
    "0": "some string",
    "1": "",
    "2": "some very very not too long string",
    "3": 0,
    "4": 875,
    "5": -98,
    "6": 2.987,
    "7": -98.979,
    "8": true,
    "9": false,
    "10": undefined,
    "11": null,
    "12": Number.NaN,
    "13": Number.MAX_SAFE_INTEGER,
    "14": Number.MIN_SAFE_INTEGER,
    "15": Number.MAX_SAFE_INTEGER + 1,
    "16": Number.MIN_SAFE_INTEGER - 1,
}

const amountKeys = 16 + 1;

export default mockObject;
export { amountKeys };
