import { CheckFunction } from "./types";
export { checkNumber, checkBoolean, checkString, CheckNumberArgs, CheckBooleanArgs, CheckStringArgs };
type CheckNumberArgs = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    notUndefined?: boolean;
    notNull?: boolean;
    allowUndefined?: boolean;
    allowNull?: boolean;
    mayBeNaN?: boolean;
    isSafe?: boolean;
    mayBeDecimal?: boolean;
    minValue?: number;
    maxValue?: number;
};
/**
 * Checks if the value is a number. You can manipulate the checking by setting parameters to `true`.
 *
 * @param key The key for the value you want to check.
 *
 * @param errorCode The error code which is used if a check fails. Defaults to `-1`.
 * @param errorMsg The error message which is used if a check fails. Defaults to `""`.
 * @param successCode The success code which is used if no check fails. Defaults to `0`.
 * @param successMsg The success message which is used if no check fails. Defaults to `""`.
 *
 * @param allowUndefined If the value that is being checked is undefined, `true` is returned.
 * @param allowNull If the value that is being checked is null, `true` is returned.
 * @param mayBeNaN If the value that is being checked is NaN (Number.NaN) (not a number), `true` is returned.
 *
 * @param isSafe Checks if the value being checked is within the safe integer range (-(2^53 - 1) to 2^53 - 1). Note that decimal numbers will result in `false` being returned unless `mayBeDecimal` is set to true.
 * @param mayBeDecimal If this is set to `true` numbers may be decimal numbers.
 *
 * @param minValue The minimum value the value that is being checked may have.
 * @param maxValue The maximum value the value that is being checked may have.
 *
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
declare function checkNumber({ key, errorCode, errorMsg, successCode, successMsg, allowUndefined, allowNull, mayBeNaN, isSafe, mayBeDecimal, minValue, maxValue }: CheckNumberArgs): CheckFunction;
type CheckBooleanArgs = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    allowUndefined?: boolean;
    allowNull?: boolean;
};
/**
 * Checks if the value is a boolean. You can manipulate the checking by setting parameters to `true`.
 *
 * @param key The key for the value you want to check.
 *
 * @param errorCode The error code which is used if a check fails. Defaults to `-1`.
 * @param errorMsg The error message which is used if a check fails. Defaults to `""`.
 * @param successCode The success code which is used if no check fails. Defaults to `0`.
 * @param successMsg The success message which is used if no check fails. Defaults to `""`.
 *
 * @param allowUndefined If the value that is being checked is undefined, `true` is returned.
 * @param allowNull If the value that is being checked is null, `true` is returned.
 *
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
declare function checkBoolean({ key, errorCode, errorMsg, successCode, successMsg, allowUndefined, allowNull }: CheckBooleanArgs): CheckFunction;
type CheckStringArgs = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    allowUndefined?: boolean;
    allowNull?: boolean;
    minLength?: number;
    maxLength?: number;
    validChars?: string;
    invalidChars?: string;
    regExpMatch?: RegExp;
    regExpNoMatch?: RegExp;
};
/**
 * Checks if the value is a string. You can manipulate the checking by setting parameters to `true`.
 *
 * @param key The key for the value you want to check.
 *
 * @param errorCode The error code which is used if a check fails. Defaults to `-1`.
 * @param errorMsg The error message which is used if a check fails. Defaults to `""`.
 * @param successCode The success code which is used if no check fails. Defaults to `0`.
 * @param successMsg The success message which is used if no check fails. Defaults to `""`.
 *
 * @param allowUndefined If the value that is being checked is undefined, `true` is returned.
 * @param allowNull If the value that is being checked is null, `true` is returned.
 *
 * @param minLength The minimum length the value that is being checked may have.
 * @param maxValue The maximum length the value that is being checked may have.
 *
 * @param validChars A string with characters that the value that is being checked may contain. If the value that is being checked contains any other characters, `false` is returned.
 * @param invalidChars A string with characters that the value that is being checked may not contain. If the value that is being checked contains any characters that were specified, `false` is returned.
 * @param regExpMatch The value that is being checked has to match the RegExp, otherwise `false`is returned.
 * @param regExpNoMatch The value that is being checked may not match the RegExp, otherwise `false`is returned.
 *
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
declare function checkString({ key, errorCode, errorMsg, successCode, successMsg, allowUndefined, allowNull, minLength, maxLength, validChars, invalidChars, regExpMatch, regExpNoMatch }: CheckStringArgs): CheckFunction;
