import { NextFunction, Request, Response } from "express";

type ObjectToCheck = { [key: string]: any; };
type CheckReturn = [boolean, number, string];
type ErrorFunction = (errorCode: number, errorMsg: string, key: string) => void;
type SuccessFunction = (successCode: number, successMsg: string, key: string) => void;

type VerySmallCheckFunction = (toCheck: any) => boolean;

type Middleware = (req: CheckedRequest, res: Response, next: NextFunction) => void;

type CheckFunction = (objectToCheck: ObjectToCheck, errorFunction: ErrorFunction, successFunction: SuccessFunction) => CheckReturn;
type CheckFunctionOnCheck = (objectToCheck: ObjectToCheck, key: string, successCode: number, successMsg: string, errorFunction: ErrorFunction, successFunction: SuccessFunction) => CheckReturn;
type CheckFunctionOnCombine = () => CheckReturn;
type CheckFunctionOnCreation = () => CheckReturn;

type CheckedRequestEntry = {
    error: boolean;
    separateChecks: {
        [key: string]: {
            error: boolean;
            code: number;
            msg: string;
        };
    };
}

interface CheckedRequestContents {
    "json-contents-checker"?: CheckedRequestEntry;
}

type CheckedRequest = Request & CheckedRequestContents;

export {
    ObjectToCheck,
    CheckReturn,
    ErrorFunction,
    SuccessFunction,

    VerySmallCheckFunction,

    Middleware,

    CheckFunction,
    CheckFunctionOnCheck,
    CheckFunctionOnCombine,
    CheckFunctionOnCreation,

    CheckedRequestEntry,
    CheckedRequestContents,
    CheckedRequest
}
