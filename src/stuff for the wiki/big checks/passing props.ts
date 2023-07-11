import { checkBoolean, checkNumber, checkString, CheckFunctionChain, CheckBooleanProps, CheckNumberProps, CheckStringProps } from "@samuel-risner/json-contents-checker";

const props1: CheckBooleanProps = { key: "key0" };
const check1: CheckFunctionChain = checkBoolean(props1);

const props2: CheckNumberProps = { key: "key0" };
const check2: CheckFunctionChain = checkNumber(props2);

const props3: CheckStringProps = { key: "key0" };
const check3: CheckFunctionChain = checkString(props3);
