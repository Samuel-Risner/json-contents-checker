import { chainChecks, SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, checkBoolean, ChainResult, ChainResultKey } from "@samuel-risner/json-contents-checker";

import mockObject from "../../mockObject";

const combinedChecks = chainChecks(mockObject,
    new SmallCheckOnCheck()
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain("key0"),

    new SmallCheckOnCombine()
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain("key1"),

    new SmallCheckOnCreation({ key: "key2", objectToCheck: mockObject })
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain(),

    checkBoolean({
        key: "key3"
    })
)

const combinedResult: ChainResult = combinedChecks();

const anyCheckFailed: boolean = combinedResult.error;

const key0Result: ChainResultKey = combinedResult.separateChecks["key0"];

const checkForKeyFailed: boolean = key0Result.error;
const codeForKey: number = key0Result.code;
const messageForKey: string = key0Result.msg;
