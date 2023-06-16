import tester from "./../tester";
import mockObject, { amountKeys } from "../mockObject";

import { checkNumber, CheckReturn, CheckNumberArgs, errorFunctionDud, successFunctionDud } from "@samuel-risner/json-contents-checker";

type TestVariant = {
    namePart: string;
    func: (key: string) => CheckNumberArgs;
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
