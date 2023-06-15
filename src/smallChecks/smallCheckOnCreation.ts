import SmallCheckCore from "./smallCheckCore";
import { errorFunctionDud, successFunctionDud } from "./../funcs";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckReturn, CheckFunctionOnCreation, SmallCheckArgs, CheckFunctionChain } from "./../types";

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

    combine(): CheckFunctionOnCreation {
        return (): CheckReturn => {
            for (const checkData of this.checks) {
                if (!checkData[0](this.objectToCheck[this.key])) {
                    this.errorFunction(checkData[1], checkData[2], this.key);
                    return [false, checkData[1], checkData[2]];
                }
            }
            
            this.successFunction(this.successCode, this.successMsg, this.key);
            return [true, this.successCode, this.successMsg];
        };
    }

    combineChain(key: string = this.key, successCode: number = this.successCode, successMsg: string = this.successMsg): CheckFunctionChain {
        return super.combineChain(key, successCode, successMsg);
    }

}
