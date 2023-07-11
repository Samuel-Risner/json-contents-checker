import { checkString, CheckFunctionChain, CheckReturn } from "@samuel-risner/json-contents-checker";
import mockObject from "../../mockObject";


const check: CheckFunctionChain = checkString({ key: "key0", maxLength: 5, minLength: 2 });
const result: CheckReturn = check(mockObject);
