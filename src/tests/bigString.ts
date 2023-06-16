import tester from "./../tester";
import mockObject, { amountKeys } from "../mockObject";

import { checkString, CheckReturn, CheckStringArgs, errorFunctionDud, successFunctionDud } from "@samuel-risner/json-contents-checker";

type TestVariant = {
    namePart: string;
    func: (key: string) => CheckStringArgs;
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

export default function doChecksBigString() {
    for (const variant of testVariations) {
        for (let i = 0; i < amountKeys; i++) {
            tester.test(
                `big - string - [${variant.namePart}] - key: ${i}`,
                variant.expected.at(i),
                (key: string) => {return checkString(variant.func(key))(mockObject, errorFunctionDud, successFunctionDud)},
                String(i)
            )
        }
    }
}
