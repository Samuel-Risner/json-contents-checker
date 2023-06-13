import SmallCheckCore from "./core/smallCheck";
import { CheckFunctionOnCheck, ObjectToCheck, ErrorFunction, SuccessFunction, CheckReturn } from "./../types";

export default class OnCheck extends SmallCheckCore {

    combine(): CheckFunctionOnCheck {
        return (objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
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
