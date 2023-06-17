import SmallCheckCore from "./smallCheckCore";
import { CheckFunctionOnCheck, CheckReturn, SmallCheckArgs } from "./../types";
export default class SmallCheckOnCheck extends SmallCheckCore {
    /**
     * Combines all the checks and returns a function for evaluating them.
     * @returns A function that when called evaluates all the checks that were set (The arguments and return value are equal to `this.evaluate`).
     */
    combine(): CheckFunctionOnCheck;
    /**
     * Evaluates all the checks that were set.
     * @param objectToCheck The object from which you want to check a value.
     * @param key The key of the value you want to check.
     * @param successCode The code which is reported when the check succeeds, defaults to `0`.
     * @param successMsg The message which is reported when the check succeeds, defaults to `""`.
     * @param errorFunction The function which is called when the check fails, defaults to `errorFunctionDud`, meaning that nothing happens.
     * @param successFunction The function which is called when the check succeeds, defaults to `successFunctionDud`, meaning that nothing happens.
     * @returns A tuple consisting of a boolean, number and string. If the check failed the boolean is `false` and the number and string are the corresponding error code and message. If the check succeeded the boolean is `true` and the number and string are the passed success code and message.
     */
    evaluate({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckArgs): CheckReturn;
    /**
     * Evaluates all the checks that were set.
     * @param objectToCheck The object from which you want to check a value.
     * @param key The key of the value you want to check.
     * @param successCode The code which is reported when the check succeeds, defaults to `0`.
     * @param successMsg The message which is reported when the check succeeds, defaults to `""`.
     * @param errorFunction The function which is called when the check fails, defaults to `errorFunctionDud`, meaning that nothing happens.
     * @param successFunction The function which is called when the check succeeds, defaults to `successFunctionDud`, meaning that nothing happens.
     * @returns A tuple consisting of a boolean, number and string. If the check failed the boolean is `false` and the number and string are the corresponding error code and message. If the check succeeded the boolean is `true` and the number and string are the passed success code and message.
     */
    __call__({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckArgs): CheckReturn;
}
