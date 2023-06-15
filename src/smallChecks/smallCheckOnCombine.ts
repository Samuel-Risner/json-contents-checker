import SmallCheckCore from "./smallCheckCore";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckReturn, CheckFunctionOnCombine } from "./../types";

export default class SmallCheckOnCombine extends SmallCheckCore {

    combine(objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckFunctionOnCombine {
        return (): CheckReturn => {
            for (const checkData of this.checks) {
                if (!checkData[0](objectToCheck[key])) {
                    errorFunction(checkData[1], checkData[2], key);
                    return [false, checkData[1], checkData[2]];
                }
            }
            
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        };
    }

}
