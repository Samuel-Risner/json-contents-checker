import { errorFunctionDud, successFunctionDud } from "../funcs";
import { CheckFunctionChain, CheckResult, ErrorFunction, ObjectToCheck, SuccessFunction } from "../types";

export { checkString, CheckStringArgs }

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
}

/**
 * Checks if the value is a string. You can manipulate the checking by setting parameters to `true`.
 * 
 * @param key The key for the value you want to check.
 * 
 * @param errorCode The error code which is used if a check fails. Defaults to `-1`.
 * @param errorMsg The error message which is used if a check fails. Defaults to `""`.
 * @param successCode The success code which is used if no check fails. Defaults to `0`.
 * @param successMsg The success message is used if no check fails. Defaults to `""`.
 * 
 * @param allowUndefined If the value that is being checked is undefined, `true` is returned.
 * @param allowNull If the value that is being checked is null, `true` is returned.
 * 
 * @param minLength The minimum length the value that is being checked may have.
 * @param maxValue The maximum length the value that is being checked may have.
 * 
 * @param validChars A string with characters that the value that is being checked may contain. If the value that is being checked contains any other characters, `false` is returned. Note that an empty string ("") always passes.
 * @param invalidChars A string with characters that the value that is being checked may not contain. If the value that is being checked contains any characters that were specified, `false` is returned.
 * @param regExpMatch The value that is being checked has to match the RegExp, otherwise `false` is returned.
 * @param regExpNoMatch The value that is being checked may not match the RegExp, otherwise `false` is returned.
 * 
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
function checkString({
    key,
    errorCode = -1,
    errorMsg = "",
    successCode = 0,
    successMsg = "",
    allowUndefined,
    allowNull,
    minLength,
    maxLength,
    validChars,
    invalidChars,
    regExpMatch,
    regExpNoMatch
}: CheckStringArgs): CheckFunctionChain {
    return (objectToCheck: ObjectToCheck, errorFunction: ErrorFunction = errorFunctionDud, successFunction: SuccessFunction = successFunctionDud): CheckResult => {
        const toCheck: unknown = objectToCheck[key];

        if (_checkString(toCheck, allowUndefined, allowNull, minLength, maxLength, validChars, invalidChars, regExpMatch, regExpNoMatch)) {
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg, key);
            return [false, errorCode, errorMsg];
        }
    }
}

/**
 * This function performs the actual checking for the function `checkString`.
 * The checks are performed in the same order as the passed parameters.
 * As soon as one check fails, `false` is returned. If all checks that were supposed to be made succeed `true` is returned.
 * The only required parameter is `toCheck`.
 * If `undefined` or `false` is provided as a value for a check, that check is skipped.
 * To understand the purpose and usage of individual parameters, refer to the comment for the `checkString` function.
 * 
 * @returns `true` if all the intended checks succeed, `false` if any check fails.
 */
function _checkString(
    toCheck: unknown,
    allowUndefined?: boolean,
    allowNull?: boolean,
    minLength?: number,
    maxLength?: number,
    validChars?: string,
    invalidChars?: string,
    regExpMatch?: RegExp,
    regExpNoMatch?: RegExp
): boolean {
    if (allowUndefined && (toCheck === undefined)) return true;
    if (allowNull && (toCheck === null)) return true;
    if (typeof toCheck !== "string") return false;
    if ((minLength !== undefined) && ((toCheck as string).length < minLength)) return false;
    if ((maxLength !== undefined) && ((toCheck as string).length > maxLength)) return false;
    if (validChars) {
        for (const letter of (toCheck as string)) {
            if (!validChars.includes(letter)) return false;
        }
    }
    if (invalidChars) {
        for (const letter of (toCheck as string)) {
            if (invalidChars.includes(letter)) return false;
        }
    }
    if (regExpMatch && !regExpMatch.test(toCheck as string)) return false;
    if (regExpNoMatch && regExpNoMatch.test(toCheck as string)) return false;

    return true;
}
