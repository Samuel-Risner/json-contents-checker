import { CheckFunctionChain } from "./../types";
export { checkBoolean, CheckBooleanArgs };
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
 * @param successMsg The success message is used if no check fails. Defaults to `""`.
 *
 * @param allowUndefined If the value that is being checked is undefined, `true` is returned.
 * @param allowNull If the value that is being checked is null, `true` is returned.
 *
 * @returns A tuple consisting of a boolean indicating if the check was successful (`true`) or not, a number which is either the error code if the check failed, otherwise the success code and a string which is either the error message if the check filed, otherwise the success message.
 */
declare function checkBoolean({ key, errorCode, errorMsg, successCode, successMsg, allowUndefined, allowNull }: CheckBooleanArgs): CheckFunctionChain;
