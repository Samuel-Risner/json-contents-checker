import tester from "./../tester";
import mockObject, { amountKeys } from "../mockObject";
import { SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, errorFunctionDud, successFunctionDud, CheckResult } from "@samuel-risner/json-contents-checker";

type TestVariant = {
    "namePart": string;
    "expectedOutputs": CheckResult[],
    "funcs": [(key: string) => CheckResult, (key: string) => CheckResult, (key: string) => CheckResult]
}

const defaultProps = { objectToCheck: mockObject, successCode: 0, successMsg: "", errorFunction: errorFunctionDud, successFunction: successFunctionDud }

const classNames: [string, string, string] = ["onCheck", "onCombine", "onCreation"];

const testVariations: TestVariant[] = [
    {
        "namePart": "isString.invalidLetters",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [true, 0, ""], // ""
            [false, -2, "-2"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .invalidLetters(-2, "-2", "xyz")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .invalidLetters(-2, "-2", "xyz")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .invalidLetters(-2, "-2", "xyz")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isBoolean",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [true, 0, ""], // true
            [true, 0, ""], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isBoolean(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isBoolean(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isBoolean(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isFiniteNumber",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [true, 0, ""], // 0
            [true, 0, ""], // 875
            [true, 0, ""], // -98
            [true, 0, ""], // 2.987
            [true, 0, ""], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isFiniteNumber(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isFiniteNumber(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isFiniteNumber(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isNaN",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [true, 0, ""], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isNaN(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isNaN(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isNaN(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isNotNull",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [true, 0, ""], // ""
            [true, 0, ""], // "some very very not too long string"
            [true, 0, ""], // 0
            [true, 0, ""], // 875
            [true, 0, ""], // -98
            [true, 0, ""], // 2.987
            [true, 0, ""], // -98.979
            [true, 0, ""], // true
            [true, 0, ""], // true
            [true, 0, ""], // undefined
            [false, -1, "-1"], // null
            [true, 0, ""], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isNotNull(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isNotNull(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isNotNull(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isNotUndefined",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [true, 0, ""], // ""
            [true, 0, ""], // "some very very not too long string"
            [true, 0, ""], // 0
            [true, 0, ""], // 875
            [true, 0, ""], // -98
            [true, 0, ""], // 2.987
            [true, 0, ""], // -98.979
            [true, 0, ""], // true
            [true, 0, ""], // false
            [false, -1, "-1"], // undefined
            [true, 0, ""], // null
            [true, 0, ""], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isNotUndefined(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isNotUndefined(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isNotUndefined(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isNumber",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [true, 0, ""], // 0
            [true, 0, ""], // 875
            [true, 0, ""], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isNumber(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isNumber(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isNumber(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isSafeNumber",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [true, 0, ""], // 0
            [true, 0, ""], // 875
            [true, 0, ""], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isSafeNumber(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isSafeNumber(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isSafeNumber(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isString",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [true, 0, ""], // ""
            [true, 0, ""], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isString.MaxLength",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [true, 0, ""], // ""
            [false, -2, "-2"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .maxLength(-2, "-2", 11)
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .maxLength(-2, "-2", 11)
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .maxLength(-2, "-2", 11)
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isNumber.maxSize",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [true, 0, ""], // 0
            [true, 0, ""], // 875
            [true, 0, ""], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -2, "-2"], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [false, -2, "-2"], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isNumber(-1, "-1")
                    .maxSize(-2, "-2", 875)
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isNumber(-1, "-1")
                    .maxSize(-2, "-2", 875)
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isNumber(-1, "-1")
                    .maxSize(-2, "-2", 875)
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isString.minLength",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [false, -2, "-2"], // ""
            [true, 0, ""], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .minLength(-2, "-2", 11)
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .minLength(-2, "-2", 11)
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .minLength(-2, "-2", 11)
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isNumber.minSize",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -2, "-2"], // 0
            [true, 0, ""], // 875
            [false, -2, "-2"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [false, -2, "-2"], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [false, -2, "-2"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isNumber(-1, "-1")
                    .minSize(-2, "-2", 875)
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isNumber(-1, "-1")
                    .minSize(-2, "-2", 875)
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isNumber(-1, "-1")
                    .minSize(-2, "-2", 875)
                    .combine()();
            }
        ]
    },
    {
        "namePart": "isString.validLetters",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [true, 0, ""], // ""
            [false, -2, "-2"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .validLetters(-2, "-2", "some string")
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .validLetters(-2, "-2", "some string")
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .validLetters(-2, "-2", "some string")
                    .combine()();
            }
        ]
    },
    {
        "namePart": "regExpMatch",
        "expectedOutputs": [
            [true, 0, ""], // "some string"
            [false, -2, "-2"], // ""
            [false, -2, "-2"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .regExpMatch(-2, "-2", new RegExp("some string"))
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .regExpMatch(-2, "-2", new RegExp("some string"))
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .regExpMatch(-2, "-2", new RegExp("some string"))
                    .combine()();
            }
        ]
    },
    {
        "namePart": "regExpNoMatch",
        "expectedOutputs": [
            [false, -2, "-2"], // "some string"
            [true, 0, ""], // ""
            [true, 0, ""], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "funcs": [
            (key: string): CheckResult => {
                return new SmallCheckOnCheck()
                    .isString(-1, "-1")
                    .regExpNoMatch(-2, "-2", new RegExp("some string"))
                    .combine()({ key: key, ...defaultProps });
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCombine()
                    .isString(-1, "-1")
                    .regExpNoMatch(-2, "-2", new RegExp("some string"))
                    .combine({ key: key, ...defaultProps })();
            },
            (key: string): CheckResult => {
                return new SmallCheckOnCreation({ key: key, ...defaultProps })
                    .isString(-1, "-1")
                    .regExpNoMatch(-2, "-2", new RegExp("some string"))
                    .combine()();
            }
        ]
    },
];

export default function doChecksSmall() {
    for (const testVariant of testVariations) {
        for (let i = 0; i < amountKeys; i++) {
            for (let j = 0; j < classNames.length; j++) {
                tester.test(
                    `small - ${classNames[j]} - [${testVariant.namePart}] - key: ${i}`,
                    testVariant.expectedOutputs.at(i),
                    testVariant.funcs[j],
                    String(i)
                )
            }
        }
    }
}