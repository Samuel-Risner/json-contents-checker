import { SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, CheckReturn, SmallCheckArgs, SmallCheckArgsOptional } from "@samuel-risner/json-contents-checker";

import mockObject from "../../mockObject";

const props: SmallCheckArgs = { key: "", objectToCheck: mockObject };
const props2: SmallCheckArgsOptional = {};

const result1: CheckReturn = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    (props)

const result2: CheckReturn = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    (props)

const result3: CheckReturn = new SmallCheckOnCreation(props)
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    (props2)
