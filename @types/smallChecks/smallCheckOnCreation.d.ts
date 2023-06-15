import SmallCheckCore from "./smallCheckCore";
import { ObjectToCheck, ErrorFunction, SuccessFunction, CheckFunctionOnCreation } from "./../types";
export default class SmallCheckOnCreation extends SmallCheckCore {
    private objectToCheck;
    private key;
    private successCode;
    private successMsg;
    private errorFunction;
    private successFunction;
    constructor(objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction);
    combine(): CheckFunctionOnCreation;
}
