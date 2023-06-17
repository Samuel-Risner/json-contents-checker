import { CheckFunctionChain } from "./../types";
export { checkString, CheckStringArgs };
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
 * @param validChars A string with characters that the value that is being checked may contain. If the value that is being checked contains any other characters, `false` is returned. Note that an empty string ("") always passes.
 * @param invalidChars A string with characters that the value that is being checked may not contain. If the value that is being checked contains any characters that were specified, `false` is returned.
 * @param regExpMatch The value that is being checked has to match the RegExp, otherwise `false`is returned.
 * @param regExpNoMatch The value that is being checked may not match the RegExp, otherwise `false`is returned.
 *
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
declare function checkString({ key, errorCode, errorMsg, successCode, successMsg, allowUndefined, allowNull, minLength, maxLength, validChars, invalidChars, regExpMatch, regExpNoMatch }: CheckStringArgs): CheckFunctionChain;
