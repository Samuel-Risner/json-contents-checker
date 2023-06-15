import SmallCheckCore from "./smallCheckCore";
import { errorFunctionDud, successFunctionDud } from "./../funcs";
import { CheckReturn, CheckFunctionPreCheck, SmallCheckArgs } from "./../types";

export default class SmallCheckOnCombine extends SmallCheckCore {

    combine({objectToCheck, key, successCode=0, successMsg="", errorFunction=errorFunctionDud, successFunction=successFunctionDud}: SmallCheckArgs): CheckFunctionPreCheck {
        return (): CheckReturn => {
            return this.evaluateChecks(objectToCheck, key, successCode, successMsg, errorFunction, successFunction);
        };
    }

}
