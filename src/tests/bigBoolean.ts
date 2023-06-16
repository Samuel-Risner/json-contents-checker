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
        func: (key: string) => {
            return { key: key }
        },
        expected: []
    }
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
