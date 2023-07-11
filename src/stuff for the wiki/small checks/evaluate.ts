import { SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, CheckReturn } from "@samuel-risner/json-contents-checker";

import mockObject from "../../mockObject";

const result1: CheckReturn = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .evaluate({ key: "key0", objectToCheck: mockObject})

const result2: CheckReturn = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .evaluate({ key: "key0", objectToCheck: mockObject})

const result3: CheckReturn = new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .evaluate({})
