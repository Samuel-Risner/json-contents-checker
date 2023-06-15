import SmallCheckCore from "./smallCheckCore";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckFunctionOnCombine } from "./../types";
export default class SmallCheckOnCombine extends SmallCheckCore {
    combine(objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckFunctionOnCombine;
}
