import tester from "./../tester";
import mockObject, { amountKeys } from "../mockObject";

import { checkNumber, CheckResult, CheckNumberArgs, errorFunctionDud, successFunctionDud } from "@samuel-risner/json-contents-checker";

type TestVariant = {
    namePart: string;
    func: (key: string) => CheckNumberArgs;
    expected: CheckResult[];
}

const testVariations: TestVariant[] = [
    {
        namePart: "-",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1" }
        },
        expected: [
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
        ]
    },
    {
        namePart: "allowNull",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", allowNull: true }
        },
        expected: [
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
            [true, 0, ""], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "allowUndefined",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", allowUndefined: true }
        },
        expected: [
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
            [true, 0, ""], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "isSafe",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", isSafe: true }
        },
        expected: [
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
        ]
    },
    {
        namePart: "maxValue: 875",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", maxValue: 875 }
        },
        expected: [
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
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "allowDecimal",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", allowDecimal: true }
        },
        expected: [
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
        ]
    },
    {
        namePart: "allowNaN",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", allowNaN: true }
        },
        expected: [
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
            [true, 0, ""], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [true, 0, ""], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [true, 0, ""], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "minValue: 875",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", minValue: 875 }
        },
        expected: [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [true, 0, ""], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [true, 0, ""], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [true, 0, ""], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "isSafe, allowDecimal",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1", isSafe: true, allowDecimal: true }
        },
        expected: [
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
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
];

export default function doChecksBigNumber() {
    for (const variant of testVariations) {
        for (let i = 0; i < amountKeys; i++) {
            tester.test(
                `big - number - [${variant.namePart}] - key: ${i}`,
                variant.expected.at(i),
                (key: string) => {return checkNumber(variant.func(key))(mockObject, errorFunctionDud, successFunctionDud)},
                String(i)
            )
        }
    }
}
