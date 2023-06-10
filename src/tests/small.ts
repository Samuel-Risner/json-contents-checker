import tester from "./../tester";
import mockObject, { amountKeys } from "./mockObject";
import { errorFunction, successFunction } from "./funcs";

import {
    SmallCheck, // The class for the small checks
    checkString, checkBoolean, checkNumber, // The big check functions

    chainChecks, // Function for combining multiple checks into one
    chainChecksMiddleware, // Function for chaining multiple checks together and using them as ExpressJS middleware

    errorFunctionDebug, errorFunctionDud, // Predefined error functions
    successFunctionDebug, successFunctionDud, // Predefined success functions

    // Types (that you probably won't need):

    ObjectToCheck, // The type for the object that you want to check

    CheckBooleanArgs, CheckStringArgs, CheckNumberArgs, // Arguments that the big check functions take

    CheckFunction, // The type for the function that you get returned by calling one of: SmallCheck.combine, checkString, checkBoolean, checkNumber
    CheckReturn, // what you get returned from calling that function ^

    CheckedRequest, // When using middleware in ExpressJS use "req: CheckedRequest" instead of "req: Request"
    CheckedRequestContents, // The attribute in ^ that was set by the middleware
    CheckedRequestEntry, // The value of ^
    Middleware, // The type of the function that chainChecksMiddleware returns

    ErrorFunction, SuccessFunction // The function types for the error and success functions
} from "@samuel-risner/json-contents-checker";

type TestVariant = {
    "namePart": string;
    "expectedOutputs": CheckReturn[],
    "func": (key: string) => CheckReturn
}

const testVariations: TestVariant[] = [
    {
        "namePart": "isString.invalidLetters",
        "expectedOutputs": [
            [true, 0, ""],
            [true, 0, ""],
            [false, -2, "-2"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
        ],
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isString(-1, "-1")
            .invalidLetters(-2, "-2", "xyz")
            .combine()(mockObject, errorFunction, successFunction);
        }
    },
    {
        "namePart": "isBoolean",
        "expectedOutputs": [
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [true, 0, ""],
            [true, 0, ""],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
        ],
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isBoolean(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
    },
    {
        "namePart": "isFiniteNumber",
        "expectedOutputs": [
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [true, 0, ""],
            [true, 0, ""],
            [true, 0, ""],
            [true, 0, ""],
            [true, 0, ""],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [false, -1, "-1"],
            [true, 0, ""],
            [true, 0, ""],
            [true, 0, ""],
            [true, 0, ""],
        ],
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isFiniteNumber(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isNaN(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isNotNull(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isNotUndefined(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isNumber(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isSafeNumber(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isString(-1, "-1")
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isString(-1, "-1")
            .maxLength(-2, "-2", 11)
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isNumber(-1, "-1")
            .maxSize(-2, "-2", 875)
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isString(-1, "-1")
            .minLength(-2, "-2", 11)
            .combine()(mockObject, errorFunction, successFunction);
        }
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
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .isNumber(-1, "-1")
            .minSize(-2, "-2", 875)
            .combine()(mockObject, errorFunction, successFunction);
        }
    },
];

export default function doChecksSmall() {
    for (const testVariant of testVariations) {
        for (let i = 0; i < amountKeys; i++) {
            tester.test(
                `small - [${testVariant.namePart}] - key: ${i}`,
                testVariant.expectedOutputs.at(i),
                testVariant.func,
                String(i)
            )
        }
    }
}
