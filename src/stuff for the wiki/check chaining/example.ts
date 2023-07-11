import { chainChecks, errorFunctionDud, successFunctionDud, SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, checkBoolean } from "@samuel-risner/json-contents-checker";

import mockObject from "../../mockObject";

const check = chainChecks(errorFunctionDud, successFunctionDud, mockObject,
    new SmallCheckOnCombine()
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain("key0"),

    new SmallCheckOnCreation({ key: "key1", objectToCheck: mockObject })
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain(),

    new SmallCheckOnCheck()
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain("key2"),

    checkBoolean({
        key: "key3"
    })
)

check();
