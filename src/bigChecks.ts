import { BigCheckFunction, CheckReturn, ErrorFunction, JsonObject, SuccessFunction } from "./types";

export {
    checkNumber
}

type CheckNumberProps = {
    nameOfJsonAttribute: string;
    errorCode: number;
    errorMsg: string;
    successCode: number;
    successMsg: string;
    notUndefined?: boolean;
    notNull?: boolean;
    isSafe?: boolean;
    mayBeDecimal?: boolean;
    isNumber?: boolean;
    minValue?: number;
    maxValue?: number;
}

function checkNumber({
    nameOfJsonAttribute,
    errorCode,
    errorMsg,
    successCode,
    successMsg,
    notUndefined=true,
    notNull=true,
    isSafe=true,
    mayBeDecimal=false,
    isNumber=false,
    minValue,
    maxValue}: CheckNumberProps
): BigCheckFunction {
    return (jsonObject: JsonObject, successFunction: SuccessFunction, errorFunction: ErrorFunction): CheckReturn => {
        const toCheck: unknown = jsonObject[nameOfJsonAttribute];

        if (_checkNumber(toCheck, notUndefined, notNull, isSafe, mayBeDecimal, isNumber, minValue, maxValue)) {
            successFunction(successCode, successMsg);
            return [true, successCode, successMsg];
        } else {
            errorFunction(errorCode, errorMsg);
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
