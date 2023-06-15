import SmallCheckCore from "./smallCheckCore";
import { errorFunctionDud, successFunctionDud } from "./../funcs";
import { CheckReturn, CheckFunctionOnCombine, SmallCheckArgs } from "./../types";

export default class SmallCheckOnCombine extends SmallCheckCore {

    combine({objectToCheck, key, successCode=0, successMsg="", errorFunction=errorFunctionDud, successFunction=successFunctionDud}: SmallCheckArgs): CheckFunctionOnCombine {
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
