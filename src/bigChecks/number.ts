import { errorFunctionDud, successFunctionDud } from "../funcs";
import { CheckFunctionChain, CheckResult, ErrorFunction, ObjectToCheck, SuccessFunction } from "../types";

export { checkNumber, CheckNumberProps }

type CheckNumberProps = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    allowUndefined?: boolean;
    allowNull?: boolean;
    allowNaN?: boolean;
    isSafe?: boolean;
    allowDecimal?: boolean;
    minValue?: number;
    maxValue?: number;
}

/**
 * Checks if the value is a number. You can manipulate the checking by setting parameters to `true`.
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
 * @param allowNaN If the value that is being checked is NaN (`Number.NaN`) (not a number), `true` is returned.
 * 
 * @param isSafe Checks if the value being checked is within the safe integer range (-(2^53 - 1) to 2^53 - 1). Note that decimal numbers will result in `false` being returned unless `allowDecimal` is set to true.
 * @param allowDecimal If this is set to `true` numbers may be decimal numbers.
 * 
 * @param minValue The minimum value the value that is being checked may have.
 * @param maxValue The maximum value the value that is being checked may have.
 * 
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not (`false`), a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check failed, otherwise the success message.
 */
function checkNumber({
    key,
    errorCode = -1,
    errorMsg = "",
    successCode = 0,
    successMsg = "",
    allowUndefined,
    allowNull,
    allowNaN,
    isSafe,
    allowDecimal,
    minValue,
    maxValue
}: CheckNumberProps): CheckFunctionChain {
    return (objectToCheck: ObjectToCheck, errorFunction: ErrorFunction = errorFunctionDud, successFunction: SuccessFunction = successFunctionDud): CheckResult => {
        const toCheck: unknown = objectToCheck[key];

        if (_checkNumber(toCheck, allowUndefined, allowNull, allowNaN, isSafe, allowDecimal, minValue, maxValue)) {
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
 * 
 * @returns `true` if all the intended checks succeed, `false` if any check fails.
 */
function _checkNumber(
    toCheck: unknown,
    allowUndefined?: boolean,
    allowNull?: boolean,
    allowNaN?: boolean,
    isSafe?: boolean,
    allowDecimal?: boolean,
    minValue?: number,
    maxValue?: number
): boolean {
    if (allowUndefined && (toCheck === undefined)) return true;
    if (allowNull && (toCheck === null)) return true;
    if (allowNaN && Number.isNaN(toCheck)) return true;

    if (isSafe && allowDecimal) {
        if (!Number.isFinite(toCheck)) return false;
        if ((toCheck as number > Number.MAX_SAFE_INTEGER) || (toCheck as number < Number.MIN_SAFE_INTEGER)) return false;
    } else if (!isSafe && !allowDecimal) {
        if (!Number.isInteger(toCheck)) return false;
    } else {
        if (isSafe && !Number.isSafeInteger(toCheck)) return false;
        if (allowDecimal && !Number.isFinite(toCheck)) return false;
    }

    if ((minValue !== undefined) && (toCheck as number < minValue)) return false;
    if ((maxValue !== undefined) && (toCheck as number > maxValue)) return false;

    return true;
}
