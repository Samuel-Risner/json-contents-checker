import SmallCheckCore from "./smallCheckCore";
import { errorFunctionDud, successFunctionDud } from "./../funcs";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckReturn, CheckFunctionPreCheck, SmallCheckArgs, CheckFunctionChain } from "./../types";

export default class SmallCheckOnCreation extends SmallCheckCore {

    private objectToCheck: ObjectToCheck;
    private key: string;
    private successCode: number;
    private successMsg: string;
    private errorFunction: ErrorFunction;
    private successFunction: SuccessFunction;

    constructor({objectToCheck, key, successCode=0, successMsg="", errorFunction=errorFunctionDud, successFunction=successFunctionDud}: SmallCheckArgs) {
        super();

        this.objectToCheck = objectToCheck;
        this.key = key;
        this.successCode = successCode;
        this.successMsg = successMsg;
        this.errorFunction = errorFunction;
        this.successFunction = successFunction;
    }

    combine(): CheckFunctionPreCheck {
        return (): CheckReturn => {
            return super.evaluateChecks(this.objectToCheck, this.key, this.successCode, this.successMsg, this.errorFunction, this.successFunction);
        };
    }

    combineChain(key: string = this.key, successCode: number = this.successCode, successMsg: string = this.successMsg): CheckFunctionChain {
        return super.combineChain(key, successCode, successMsg);
    }

}
