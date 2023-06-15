import SmallCheckCore from "./smallCheckCore";
import { CheckFunctionOnCreation, SmallCheckArgs } from "./../types";
export default class SmallCheckOnCreation extends SmallCheckCore {
    private objectToCheck;
    private key;
    private successCode;
    private successMsg;
    private errorFunction;
    private successFunction;
    constructor({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckArgs);
    combine(): CheckFunctionOnCreation;
}
