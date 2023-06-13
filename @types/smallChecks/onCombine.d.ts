import SmallCheckCore from "./core/smallCheck";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckFunctionOnCombine } from "./../types";
export default class OnCombine extends SmallCheckCore {
    combine(objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckFunctionOnCombine;
}
