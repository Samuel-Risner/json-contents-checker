import { CheckFunction, CheckReturn, ErrorFunction, SuccessFunction, VerySmallCheckFunction, ObjectToCheck } from "./types";

export default class SmallCheck {

    /**
     * An array containing the different check functions that are to be used and their error codes and messages.
     */
    private checks: [VerySmallCheckFunction, number, string][];
    
    constructor(
        /**
         * When the function returned by `combine` is called, this value is used as a key to retrieve the corresponding value from the object passed to the function returned by `combine`.
         * All the checks that are set will be performed on the retrieved value.
         */
        private nameOfJsonAttribute: string
    ) {
        this.checks = [];
    }

    /**
     * Pushes the passed arguments to `this.checks`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param checkFunction The function which does the checking.
     * @returns This object (saves some lines of code).
     */
    private checkCore(errorCode: number, errorMsg: string, checkFunction: VerySmallCheckFunction): this {
        this.checks.push([checkFunction, errorCode, errorMsg]);
        return this;
    }

    /**
     * The check fails if the value does not exist / is `undefined`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNotUndefined(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: unknown): boolean => {
            return toCheck === undefined;
        })
    }

    /**
     * The check fails if the value is `null`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNotNull(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: unknown): boolean => {
            return toCheck === null;
        })
    }

    /**
     * The check fails if the value isn't a number or is a finite number.
     * 
     * Valid values: `-10`, `-1.0`, `0`, `5`, `1.0`
     * 
     * Invalid values: `"0"`, `2.5`, `null`, `undefined`, `true`, `NaN`
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNumber(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: any): boolean => {
            return !Number.isInteger(toCheck);
        })
    }

    /**
     * The check fails if the value isn't a number but succeeds when it is finite.
     * 
     * Valid values: `-10`, `-1.0`, `0`, `5`, `1.0`, `2.5`
     * 
     * Invalid values: `"0"`, `null`, `undefined`, `true`, `NaN`
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isFiniteNumber(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: any): boolean => {
            return !Number.isFinite(toCheck);
        })
    }

    /**
     * The check only succeeds when the value is `NaN`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isNaN(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: any): boolean => {
            return !Number.isNaN(toCheck);
        })
    }

    /**
     * The check fails when the value is not a safe integer.
     * 
     * Safe integers range from `-(2^53 - 1)` to `2^53 - 1`.
     * 
     * Valid values: `-10`, `-1.0`, `0`, `5`, `1.0`
     * 
     * Invalid values: `"0"`, `2.5`, `null`, `undefined`, `true`, `NaN` (Or when the number is too big or small.)
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isSafeNumber(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: any): boolean => {
            return !Number.isSafeInteger(toCheck);
        })
    }

    /**
     * The check fails when the value is not a string.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isString(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: any): boolean => {
            return !(typeof toCheck === "string");
        })
    }

    /**
     * The check fails when the value is not a boolean.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @returns This object, meaning that you can chain checks.
     */
    isBoolean(errorCode: number, errorMsg: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: any): boolean => {
            return !(typeof toCheck === "boolean");
        })
    }

    /**
     * The check fails when the length of the value is smaller than `minLength`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type string e.g. use `isString`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param minLength The minimum length the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    minLength(errorCode: number, errorMsg: string, minLength: number): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: string): boolean => {
            return toCheck.length < minLength;
        })
    }

    /**
     * The check fails when the length of the value is greater than `maxLength`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type string e.g. use `isString`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param maxLength The maximum length the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    maxLength(errorCode: number, errorMsg: string, maxLength: number): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: string): boolean => {
            return toCheck.length > maxLength;
        })
    }

    /**
     * The check fails when the size of the value is smaller than the `minSize`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type number e.g. use `isNumber` or `isFiniteNumber` or `isSafeNumber`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param minSize The minimum size the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    minSize(errorCode: number, errorMsg: string, minSize: number): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: number): boolean => {
            return toCheck < minSize;
        })
    }

    /**
     * The check fails when the size of the value is greater than the `minSize`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type number e.g. use `isNumber` or `isFiniteNumber` or `isSafeNumber`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param maxSize The maximum size the value may have.
     * @returns This object, meaning that you can chain checks.
     */
    maxSize(errorCode: number, errorMsg: string, maxSize: number): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: number): boolean => {
            return toCheck > maxSize;
        })
    }

    /**
     * The check fails if the value contains any letters that are not in `letters`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type string e.g. use `isString`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param letters The letters which the value may contain.
     */
    validLetters(errorCode: number, errorMsg: string, letters: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: string): boolean => {
            for (const letter of toCheck) {
                if (!letters.includes(letter)) return false;
            }
            return true;
        })
    }

    /**
     * The check fails if the value contains any letters that are in `letters`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type string e.g. use `isString`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param letters The letters which the value may not contain.
     */
    invalidLetters(errorCode: number, errorMsg: string, letters: string): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: string): boolean => {
            for (const letter of toCheck) {
                if (letters.includes(letter)) return false;
            }
            return true;
        })
    }

    /**
     * The check fails if the value does not match the provided RegExp `regExp`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type string e.g. use `isString`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param regExp The RegExp to which the value should match.
     */
    regExpMatch(errorCode: number, errorMsg: string, regExp: RegExp): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: string): boolean => {
            return regExp.test(toCheck);
        })
    }

    /**
     * The check fails if the value matches the provided RegExp `regExp`.
     * 
     * **NOTE:** Before using this check, you should confirm that the value is of type string e.g. use `isString`.
     * 
     * @param errorCode The code which is reported when the check fails.
     * @param errorMsg The message which is reported when the check fails.
     * @param regExp The RegExp to which the value should not match.
     */
    regExpNoMatch(errorCode: number, errorMsg: string, regExp: RegExp): this {
        return this.checkCore(errorCode, errorMsg, (toCheck: string): boolean => {
            return !regExp.test(toCheck);
        })
    }

    /**
     * Combines all the checks into one function and returns it.
     * 
     * @param successCode The code which is reported when all the checks succeeded.
     * @param successMsg The message which is reported when all the checks succeeded.
     * @returns A function which when called with the object you want to check returns tuple containing `true` if the checks were successful, otherwise false. A code indicating the success or failure, the failure codes were specified with the single checks, the success one with the creation of this object. And a success or failure message, the failure messages were specified with the single checks, the success one with the creation of this object.
     */
    combine(successCode: number=0, successMsg: string=""): CheckFunction {
        return (objectToCheck: ObjectToCheck, errorFunction: ErrorFunction, successFunction: SuccessFunction): CheckReturn => {
            for (const checkData of this.checks) {
                if (checkData[0](objectToCheck[this.nameOfJsonAttribute])) {
                    errorFunction(checkData[1], checkData[2], this.nameOfJsonAttribute);
                    return [false, checkData[1], checkData[2]];
                }
            }
            
            successFunction(successCode, successMsg, this.nameOfJsonAttribute);
            return [true, successCode, successMsg];
        };
    }

}
