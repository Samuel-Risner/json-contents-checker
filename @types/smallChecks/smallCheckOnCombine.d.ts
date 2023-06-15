import SmallCheckCore from "./smallCheckCore";
import { CheckFunctionOnCombine, SmallCheckArgs } from "./../types";
export default class SmallCheckOnCombine extends SmallCheckCore {
    combine({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckArgs): CheckFunctionOnCombine;
}
