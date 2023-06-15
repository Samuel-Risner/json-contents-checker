import SmallCheckCore from "./smallCheckCore";
import { errorFunctionDud, successFunctionDud } from "./../funcs";
import { CheckFunctionChain, CheckFunctionOnCheck, CheckReturn, ErrorFunction, ObjectToCheck, SmallCheckArgs, SuccessFunction } from "./../types";

export default class SmallCheckOnCheck extends SmallCheckCore {

    combine(): CheckFunctionOnCheck {
        return ({objectToCheck, key, successCode=0, successMsg="", errorFunction=errorFunctionDud, successFunction=successFunctionDud}: SmallCheckArgs): CheckReturn => {
            return this.evaluateChecks(objectToCheck, key, successCode, successMsg, errorFunction, successFunction);
        };
    }

}
