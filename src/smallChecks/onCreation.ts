import SmallCheckCore from "./core/smallCheck";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckReturn, CheckFunctionOnCreation } from "./../types";

export default class OnCreation extends SmallCheckCore {

    constructor(
        private objectToCheck: ObjectToCheck,
        private key: string,
        private successCode: number,
        private successMsg: string,
        private errorFunction: ErrorFunction,
        private successFunction: SuccessFunction
    ) {
        super();
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

}
