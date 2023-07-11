import { checkString, CheckFunctionChain } from "@samuel-risner/json-contents-checker";


const check: CheckFunctionChain = checkString({ key: "key0", maxLength: 5, minLength: 2 });
