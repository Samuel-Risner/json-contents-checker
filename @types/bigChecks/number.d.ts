import { CheckFunctionChain } from "./../types";
export { checkNumber, CheckNumberArgs };
type CheckNumberArgs = {
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
 * @param allowNaN If the value that is being checked is NaN (Number.NaN) (not a number), `true` is returned.
 *
 * @param isSafe Checks if the value being checked is within the safe integer range (-(2^53 - 1) to 2^53 - 1). Note that decimal numbers will result in `false` being returned unless `allowDecimal` is set to true.
 * @param allowDecimal If this is set to `true` numbers may be decimal numbers.
 *
 * @param minValue The minimum value the value that is being checked may have.
 * @param maxValue The maximum value the value that is being checked may have.
 *
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
declare function checkNumber({ key, errorCode, errorMsg, successCode, successMsg, allowUndefined, allowNull, allowNaN, isSafe, allowDecimal, minValue, maxValue }: CheckNumberArgs): CheckFunctionChain;
