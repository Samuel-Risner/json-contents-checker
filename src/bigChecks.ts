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
    errorCode=-1,
    errorMsg="",
    successCode=0,
    successMsg="",
    notUndefined,
    notNull,
    isSafe=true,
    mayBeDecimal,
    isNumber,
    minValue,
    maxValue}: CheckNumberProps
): CheckFunction {
    return (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[key];

        if (_checkNumber(toCheck, notUndefined, notNull, isSafe, mayBeDecimal, isNumber, minValue, maxValue)) {
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg, key);
            return [true, successCode, successMsg];
        }
    }
}

function _checkNumber(
    toCheck: unknown,
    notUndefined: boolean=true,
    notNull: boolean=true,
    isSafe: boolean=true,
    mayBeDecimal: boolean=false,
    isNumber: boolean=false,
    minValue?: number,
    maxValue?: number
): boolean {
    if (notUndefined && (toCheck === undefined)) return false;

    if (notNull && (toCheck === null)) return false;

    if (isSafe && mayBeDecimal) {
        const num: number = Number(toCheck);

        if (Number.isNaN(num) || (num === Infinity) || (num === -Infinity)) return false;

        if ((num < Number.MIN_SAFE_INTEGER) || (num > Number.MAX_SAFE_INTEGER)) return false;

        if (!Number.isFinite(toCheck)) return false;

    } else {
        if (isSafe && !Number.isSafeInteger(toCheck)) return false;

        if (mayBeDecimal && !Number.isFinite(toCheck)) return false;
    }

    if (isNumber && !Number.isInteger(toCheck)) return false;

    if (minValue && (toCheck as number < minValue)) return false;
    if (maxValue && (toCheck as number > maxValue)) return false;

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
    errorCode=-1,
    errorMsg="",
    successCode=0,
    successMsg="",
    notUndefined,
    notNull,
    isBoolean=true
}: CheckBooleanProps
    ): CheckFunction {
    return (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[key];

        if (_checkBoolean(toCheck, notUndefined, notNull, isBoolean)) {
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg, key);
            return [true, successCode, successMsg];
        }
    }
}

function _checkBoolean(
    toCheck: unknown,
    notUndefined: boolean=true,
    notNull: boolean=true,
    isBoolean: boolean=false,
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
    errorCode=-1,
    errorMsg="",
    successCode=0,
    successMsg="",
    notUndefined,
    notNull,
    isString=true,
    minLength,
    maxLength,
    validChars,
    invalidChars,
    regExpMatch,
    regExpNoMatch
}: CheckStringProps
): CheckFunction {
    return (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[key];

        if (_checkString(toCheck, notUndefined, notNull, isString, minLength, maxLength, validChars, invalidChars, regExpMatch, regExpNoMatch)) {
            successFunction(successCode, successMsg, key);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg, key);
            return [true, successCode, successMsg];
        }
    }
}

function _checkString(
    toCheck: unknown,
    notUndefined: boolean=true,
    notNull: boolean=true,
    isString: boolean=false,
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

    if (minLength && ((toCheck as string).length < minLength)) return false;
    if (maxLength && ((toCheck as string).length > maxLength)) return false;

    if (validChars) {
        for (const letter of toCheck as string) {
            if (!validChars.includes(letter)) return false;
        }
    }

    if (invalidChars) {
        for (const letter of toCheck as string) {
            if (invalidChars.includes(letter)) return false;
        }
    }

    if (regExpMatch && !regExpMatch.test(toCheck as string)) return false;

    if (regExpNoMatch && regExpNoMatch.test(toCheck as string)) return false;

    return true;
}
