import { ErrorFunction, SuccessFunction, VerySmallCheckFunction, ObjectToCheck, CheckFunctionOnCheck, CheckFunctionPreCheck, CheckFunctionChain, CheckResult, SmallCheckProps } from "./../types";
export default abstract class SmallCheckCore extends Function {
    /**
     * An array containing the different check functions that are to be used and their error codes and messages.
     *
     * When a check returns `true`, it succeeded / everything is ok. If it returns `false`, the check failed / an error occurred.
     */
    protected checks: [VerySmallCheckFunction, number, string][];
    constructor();
    /**
     * Pushes the passed arguments to `this.checks`.
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param checkFunction The function which does the checking.
     * @returns This object (saves some lines of code).
     */
    private checkCore;
    /**
     * ❌ The check fails if the value does not exist/is `undefined`.
     *
     * ✅ The check succeeds if the value is anything other than `undefined`.
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNotUndefined(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails if the value is `null`.
     *
     * ✅ The check succeeds if the value is anything other than `null`.
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNotNull(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails if the value isn't a number or is a finite number.
     *
     * ✅ The check succeeds if the value is a non-finite number.
     *
     * ❌ Invalid values: `"0"`, `2.5`, `null`, `undefined`, `true`, `NaN`
     *
     * ✅ Valid values: `-10`, `-1.0`, `0`, `5`, `1.0`
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNumber(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails if the value isn't a number.
     *
     * ✅ The check succeeds if the value is a finite or non-finite number.
     *
     * ❌ Invalid values: `"0"`, `null`, `undefined`, `true`, `NaN`
     *
     * ✅ Valid values: `-10`, `-1.0`, `0`, `5`, `1.0`, `2.5`
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isFiniteNumber(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails if the value is not `NaN` (Number.NaN).
     *
     * ✅ The check succeeds when the value is `NaN` (Number.NaN).
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNaN(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails when the value is not a safe integer.
     *
     * ✅ The check succeeds if the value is a safe integer.
     *
     * ℹ Safe integers range from `-(2^53 - 1)` to `2^53 - 1`.
     *
     * ℹ You can access the greatest possible safe number by using `Number.MAX_SAFE_INTEGER` and the smallest one by using `Number.MIN_SAFE_INTEGER`.
     *
     * ❌ Invalid values: `"0"`, `2.5`, `null`, `undefined`, `true`, `NaN` (Or when the number is too big or small.)
     *
     * ✅ Valid values: `-10`, `-1.0`, `0`, `5`, `1.0`
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isSafeNumber(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails when the value is not a string.
     *
     * ✅ The check succeeds when the value is a string.
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isString(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails when the value is not a boolean.
     *
     * ✅ The check succeeds when the value is a boolean.
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isBoolean(errorCode: number, errorMsg: string): this;
    /**
     * ❌ The check fails when the length of the value is smaller than `minLength`.
     *
     * ✅ The check succeeds when the length of the value is greater than `minLength`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param minLength The minimum length the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    minLength(errorCode: number, errorMsg: string, minLength: number): this;
    /**
     * ❌ The check fails when the length of the value is greater than `maxLength`.
     *
     * ✅ The check succeeds when the length of the value is smaller than `maxLength`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param maxLength The maximum length the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    maxLength(errorCode: number, errorMsg: string, maxLength: number): this;
    /**
     * ❌ The check fails when the length of the value is unequal than `exactLength`.
     *
     * ✅ The check succeeds when the length of the value is equal to `exactLength`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param exactLength The maximum length the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    exactLength(errorCode: number, errorMsg: string, exactLength: number): this;
    /**
     * ❌ The check fails when the size of the value is smaller than the `minSize`.
     *
     * ✅ The check succeeds when the size of the value is greater than the `minSize`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type number e.g. use `isNumber` or `isFiniteNumber` or `isSafeNumber`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param minSize The minimum size the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    minSize(errorCode: number, errorMsg: string, minSize: number): this;
    /**
     * ❌ The check fails when the size of the value is greater than the `minSize`.
     *
     * ✅ The check succeeds when the size of the value is smaller than the `minSize`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type number e.g. use `isNumber` or `isFiniteNumber` or `isSafeNumber`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param maxSize The maximum size the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    maxSize(errorCode: number, errorMsg: string, maxSize: number): this;
    /**
     * ❌ The check fails if the value contains any letters that are not in `letters`.
     *
     * ✅ The check succeeds if the value only contains letters that are in `letters`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param letters The letters which the value may contain.
     */
    validLetters(errorCode: number, errorMsg: string, letters: string): this;
    /**
     * ❌ The check fails if the value contains any letters that are in `letters`.
     *
     * ✅ The check succeeds if the value does not contain any letters that are in `letters`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param letters The letters which the value may not contain.
     */
    invalidLetters(errorCode: number, errorMsg: string, letters: string): this;
    /**
     * ❌ The check fails if the value does not match the provided RegExp `regExp`.
     *
     * ✅ The check succeeds if the value matches the provided RegExp `regExp`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param regExp The RegExp to which the value should match.
     */
    regExpMatch(errorCode: number, errorMsg: string, regExp: RegExp): this;
    /**
     * ❌ The check fails if the value matches the provided RegExp `regExp`.
     *
     * ✅ The check succeeds if the value does not match the provided RegExp `regExp`.
     *
     * ❗ **NOTE: Before using this check, you should confirm that the value is of type string e.g. use `isString`.**
     *
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param regExp The RegExp to which the value should not match.
     */
    regExpNoMatch(errorCode: number, errorMsg: string, regExp: RegExp): this;
    protected evaluateChecks(objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckResult;
    abstract combine(objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckFunctionPreCheck | CheckFunctionOnCheck;
    abstract evaluate({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckProps): CheckResult;
    abstract __call__({ objectToCheck, key, successCode, successMsg, errorFunction, successFunction }: SmallCheckProps): CheckResult;
    /**
     * Use this function when chaining for ExpressJS middleware.
     * @param key The key of the value you want to check.
     * @param successCode The code which is reported when the check succeeds, defaults to `0`.
     * @param successMsg The message which is reported when the check succeeds, defaults to `""`.
     */
    combineChain(key: string, successCode?: number, successMsg?: string): CheckFunctionChain;
}
