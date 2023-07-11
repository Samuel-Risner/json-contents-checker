import { checkBoolean, checkNumber, checkString, CheckFunctionChain, CheckBooleanArgs, CheckNumberArgs, CheckStringArgs } from "@samuel-risner/json-contents-checker";

const props1: CheckBooleanArgs = { key: "key0" };
const check1: CheckFunctionChain = checkBoolean(props1);

const props2: CheckNumberArgs = { key: "key0" };
const check2: CheckFunctionChain = checkNumber(props2);

const props3: CheckStringArgs = { key: "key0" };
const check3: CheckFunctionChain = checkString(props3);
