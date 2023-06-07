import { NextFunction, Request, Response } from "express";
type CheckReturn = [boolean, number, string];
type ErrorFunction = (errorCode: number, errorMsg: string, key: string) => void;
type SuccessFunction = (successCode: number, successMsg: string, key: string) => void;
type JsonObject = {
    [key: string]: any;
};
type VerySmallCheckFunction = (toCheck: any) => boolean;
type Middleware = (req: CheckedRequest, res: Response, next: NextFunction) => void;
type CheckFunction = (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction) => CheckReturn;
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
export { CheckReturn, ErrorFunction, SuccessFunction, JsonObject, VerySmallCheckFunction, Middleware, CheckFunction, CheckedRequestEntry, CheckedRequestContents, CheckedRequest };
