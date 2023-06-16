import tester from "./../tester";
import mockObject, { amountKeys } from "../mockObject";

import { checkBoolean, CheckReturn, CheckBooleanArgs, errorFunctionDud, successFunctionDud } from "@samuel-risner/json-contents-checker";

type TestVariant = {
    namePart: string;
    func: (key: string) => CheckBooleanArgs;
    expected: CheckReturn[];
}

const testVariations: TestVariant[] = [
    {
        namePart: "",
        func: (key: string): CheckBooleanArgs => {
            return { key: key, errorMsg: "-1" }
        },
        expected: [
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
        ]
    },
    {
        namePart: "",
        func: (key: string): CheckBooleanArgs => {
            return { key: key, errorMsg: "-1", allowNull: true }
        },
        expected: [
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
            [true, 0, ""], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "",
        func: (key: string): CheckBooleanArgs => {
            return { key: key, errorMsg: "-1", allowUndefined: true }
        },
        expected: [
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
            [true, 0, ""], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
    {
        namePart: "",
        func: (key: string): CheckBooleanArgs => {
            return { key: key, errorMsg: "-1", allowNull: true, allowUndefined: true }
        },
        expected: [
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
            [true, 0, ""], // undefined
            [true, 0, ""], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
];

export default function doChecksBigBoolean() {
    for (const variant of testVariations) {
        for (let i = 0; i < amountKeys; i++) {
            tester.test(
                `big - boolean - [${variant.namePart}] - key: ${i}`,
                variant.expected.at(i),
                (key: string) => {return checkBoolean(variant.func(key))(mockObject, errorFunctionDud, successFunctionDud)},
                String(i)
            )
        }
    }
}
