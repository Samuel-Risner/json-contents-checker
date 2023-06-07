import { CheckFunction, CheckReturn, ErrorFunction, JsonObject, SuccessFunction } from "./types";

export {
    checkNumber,
    checkBoolean,
    checkString,

    CheckNumberProps,
    CheckBooleanProps,
    CheckStringProps
}

//
// - Number
//

type CheckNumberProps = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    notUndefined?: boolean;
    notNull?: boolean;
    isSafe?: boolean;
    mayBeDecimal?: boolean;
    isNumber?: boolean;
    minValue?: number;
    maxValue?: number;
}

function checkNumber({
    key,
    errorCode = -1,
    errorMsg = "",
    successCode = 0,
    successMsg = "",
    notUndefined,
    notNull,
    isSafe,
    mayBeDecimal,
    isNumber,
    minValue,
    maxValue
}: CheckNumberProps): CheckFunction {
    return (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[key];

        if (_checkNumber(toCheck, notUndefined, notNull, isSafe, mayBeDecimal, isNumber, minValue, maxValue)) {
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg, key);
            return [false, errorCode, errorMsg];
        }
    }
}

/**
 * This function performs the actual checking for the function `checkNumber`.
 * The checks are performed in the same order as the passed parameters.
 * As soon as one check fails, `false` is returned. If all checks that were supposed to be made succeed `true` is returned.
 * The only required parameter is `toCheck`.
 * If `undefined` or `false` is provided as a value for a check, that check is skipped.
 * To understand the purpose and usage of individual parameters, refer to the comment for the `checkNumber` function.
 * @returns `true` if all the intended checks succeed, `false` if any check fails.
 */
function _checkNumber(
    toCheck: unknown,
    notUndefined?: boolean,
    notNull?: boolean,
    isSafe?: boolean,
    mayBeDecimal?: boolean,
    isNumber?: boolean,
    minValue?: number,
    maxValue?: number
): boolean {
    if (notUndefined && (toCheck === undefined)) return false;
    if (notNull && (toCheck === null)) return false;

    const num: number = Number(toCheck);
    if (Number.isNaN(num) || !Number.isFinite(num)) return false;

    if (isSafe && !Number.isSafeInteger(num)) return false;
    if (mayBeDecimal && !Number.isInteger(num)) return false;

    if (minValue !== undefined && num < minValue) return false;
    if (maxValue !== undefined && num > maxValue) return false;

    return true;
}

//
// - Boolean
//

type CheckBooleanProps = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    notUndefined?: boolean;
    notNull?: boolean;
    isBoolean?: boolean;
}

function checkBoolean({
    key,
    errorCode = -1,
    errorMsg = "",
    successCode = 0,
    successMsg = "",
    notUndefined,
    notNull,
    isBoolean
}: CheckBooleanProps): CheckFunction {
    return (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[key];

        if (_checkBoolean(toCheck, notUndefined, notNull, isBoolean)) {
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg, key);
            return [false, errorCode, errorMsg];
        }
    }
}

/**
 * This function performs the actual checking for the function `checkBoolean`.
 * The checks are performed in the same order as the passed parameters.
 * As soon as one check fails, `false` is returned. If all checks that were supposed to be made succeed `true` is returned.
 * The only required parameter is `toCheck`.
 * If `undefined` or `false` is provided as a value for a check, that check is skipped.
 * To understand the purpose and usage of individual parameters, refer to the comment for the `checkBoolean` function.
 * @returns `true` if all the intended checks succeed, `false` if any check fails.
 */
function _checkBoolean(
    toCheck: unknown,
    notUndefined?: boolean,
    notNull?: boolean,
    isBoolean?: boolean
): boolean {
    if (notUndefined && (toCheck === undefined)) return false;
    if (notNull && (toCheck === null)) return false;
    if (isBoolean && (typeof toCheck !== "boolean")) return false;

    return true;
}

//
// - String
//

type CheckStringProps = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    notUndefined?: boolean;
    notNull?: boolean;
    isString?: boolean;
    minLength?: number;
    maxLength?: number;
    validChars?: string;
    invalidChars?: string;
    regExpMatch?: RegExp;
    regExpNoMatch?: RegExp;
}

function checkString({
    key,
    errorCode = -1,
    errorMsg = "",
    successCode = 0,
    successMsg = "",
    notUndefined,
    notNull,
    isString,
    minLength,
    maxLength,
    validChars,
    invalidChars,
    regExpMatch,
    regExpNoMatch
}: CheckStringProps): CheckFunction {
    return (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[key];

        if (_checkString(toCheck, notUndefined, notNull, isString, minLength, maxLength, validChars, invalidChars, regExpMatch, regExpNoMatch)) {
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
 * @returns `true` if all the intended checks succeed, `false` if any check fails.
 */
function _checkString(
    toCheck: unknown,
    notUndefined?: boolean,
    notNull?: boolean,
    isString?: boolean,
    minLength?: number,
    maxLength?: number,
    validChars?: string,
    invalidChars?: string,
    regExpMatch?: RegExp,
    regExpNoMatch?: RegExp
): boolean {
    if (notUndefined && (toCheck === undefined)) return false;
    if (notNull && (toCheck === null)) return false;
    if (isString && (typeof toCheck !== "string")) return false;
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
