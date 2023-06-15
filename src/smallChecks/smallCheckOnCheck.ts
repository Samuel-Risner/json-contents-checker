import SmallCheckCore from "./smallCheckCore";
import { errorFunctionDud, successFunctionDud } from "./../funcs";
import { CheckFunctionChain, CheckFunctionOnCheck, CheckReturn, ErrorFunction, ObjectToCheck, SmallCheckArgs, SuccessFunction } from "./../types";

export default class SmallCheckOnCheck extends SmallCheckCore {

    combine(): CheckFunctionOnCheck {
        return ({objectToCheck, key, successCode=0, successMsg="", errorFunction=errorFunctionDud, successFunction=successFunctionDud}: SmallCheckArgs): CheckReturn => {
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
