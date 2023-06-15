import { CheckFunctionChain, CheckReturn, ErrorFunction, ObjectToCheck, SuccessFunction } from "./../types";

export { checkBoolean, CheckBooleanArgs }

type CheckBooleanArgs = {
    key: string;
    errorCode?: number;
    errorMsg?: string;
    successCode?: number;
    successMsg?: string;
    allowUndefined?: boolean;
    allowNull?: boolean;
}

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
function checkBoolean({
    key,
    errorCode = -1,
    errorMsg = "",
    successCode = 0,
    successMsg = "",
    allowUndefined,
    allowNull
}: CheckBooleanArgs): CheckFunctionChain {
    return (objectToCheck: ObjectToCheck, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
        const toCheck: unknown = objectToCheck[key];

        if (_checkBoolean(toCheck, allowUndefined, allowNull)) {
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
 * 
 * @returns `true` if all the intended checks succeed, `false` if any check fails.
 */
function _checkBoolean(
    toCheck: unknown,
    allowUndefined?: boolean,
    allowNull?: boolean
): boolean {
    if (allowUndefined && (toCheck === undefined)) return true;
    if (allowNull && (toCheck === null)) return true;

    return typeof toCheck === "boolean";
}
