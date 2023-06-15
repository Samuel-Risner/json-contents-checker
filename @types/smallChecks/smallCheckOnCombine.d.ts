import SmallCheckCore from "./smallCheckCore";
import { CheckFunctionPreCheck, SmallCheckArgs } from "./../types";
export default class SmallCheckOnCombine extends SmallCheckCore {
    combine({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckArgs): CheckFunctionPreCheck;
}
