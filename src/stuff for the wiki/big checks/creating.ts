import { checkBoolean, checkNumber, checkString, CheckFunctionChain } from "@samuel-risner/json-contents-checker";

const check1: CheckFunctionChain = checkBoolean({ key: "key0" });

const check2: CheckFunctionChain = checkNumber({ key: "key0" });

const check3: CheckFunctionChain = checkString({ key: "key0" });
