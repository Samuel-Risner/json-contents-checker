import { SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, CheckResult, SmallCheckProps, SmallCheckPropsOptional } from "@samuel-risner/json-contents-checker";

import mockObject from "../../mockObject";

const props: SmallCheckProps = { key: "", objectToCheck: mockObject };
const props2: SmallCheckPropsOptional = {};

const result1: CheckResult = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    (props)

const result2: CheckResult = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    (props)

const result3: CheckResult = new SmallCheckOnCreation(props)
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    (props2)
