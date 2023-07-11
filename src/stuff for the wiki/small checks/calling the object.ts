import { SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, CheckResult } from "@samuel-risner/json-contents-checker";

import mockObject from "../../mockObject";

const result1: CheckResult = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    ({ key: "key0", objectToCheck: mockObject})

const result2: CheckResult = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    ({ key: "key0", objectToCheck: mockObject})

const result3: CheckResult = new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    ({})
