import { NextFunction, Request, Response } from "express";
type ObjectToCheck = {
    [key: string]: any;
};
type CheckResult = [boolean, number, string];
type ErrorFunction = (errorCode: number, errorMsg: string, key: string) => void;
type SuccessFunction = (successCode: number, successMsg: string, key: string) => void;
type VerySmallCheckFunction = (toCheck: any) => boolean;
type Middleware = (req: CheckedRequest, res: Response, next: NextFunction) => void;
type CheckFunctionChain = (objectToCheck: ObjectToCheck, errorFunction?: ErrorFunction, successFunction?: SuccessFunction) => CheckResult;
type CheckFunctionOnCheck = (smallCheckArgs: SmallCheckArgs) => CheckResult;
type CheckFunctionPreCheck = () => CheckResult;
type SmallCheckArgs = {
    objectToCheck: ObjectToCheck;
    key: string;
    errorFunction?: ErrorFunction;
    successFunction?: SuccessFunction;
    successCode?: number;
    successMsg?: string;
};
type SmallCheckArgsOptional = {
    objectToCheck?: ObjectToCheck;
    key?: string;
    errorFunction?: ErrorFunction;
    successFunction?: SuccessFunction;
    successCode?: number;
    successMsg?: string;
};
type CheckedRequestEntry = {
    error: boolean;
    separateChecks: {
        [key: string]: {
            error: boolean;
            code: number;
            msg: string;
        };
    };
};
interface CheckedRequestContents {
    "json-contents-checker"?: CheckedRequestEntry;
}
type CheckedRequest = Request & CheckedRequestContents;
type ChainResultKey = {
    error: boolean;
    code: number;
    msg: string;
};
type ChainResult = {
    error: boolean;
    separateChecks: {
        [key: string]: ChainResultKey;
    };
};
export { ObjectToCheck, CheckResult, ErrorFunction, SuccessFunction, VerySmallCheckFunction, Middleware, CheckFunctionChain, CheckFunctionOnCheck, CheckFunctionPreCheck, SmallCheckArgs, SmallCheckArgsOptional, CheckedRequestEntry, CheckedRequestContents, CheckedRequest, ChainResultKey, ChainResult };
