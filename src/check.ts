import { NextFunction, Request, Response } from "express";

import { CheckFunction, CheckedRequest, CheckedRequestEntry, ErrorFunction, JsonObject, Middleware, SuccessFunction } from "./types";

function chainChecks(
    errorFunction: ErrorFunction,
    successFunction: SuccessFunction,
    jsonObject: JsonObject,
    ...checks: CheckFunction[]
): () => void {
    return () => {
        checks.forEach((value: CheckFunction) => {value(jsonObject, successFunction, errorFunction);});
    }
}

function chainChecksMiddleware(
    jsonObject: JsonObject,
    ...checks: CheckFunction[]
): Middleware {
    return (req: CheckedRequest, res: Response, next: NextFunction) => {
        if (!req["json-contents-checker"]) req["json-contents-checker"] = {error: false, separateChecks: {}};

        const errorFunction = (errorCode: number, errorMsg: string, key: string) => {
            (req["json-contents-checker"] as CheckedRequestEntry).separateChecks[key] = { code: errorCode, msg: errorMsg, error: true};
        }

        const successFunction = (successCode: number, successMsg: string, key: string) => {
            (req["json-contents-checker"] as CheckedRequestEntry).separateChecks[key] = { code: successCode, msg: successMsg, error: false};
        }
        
        checks.forEach((value: CheckFunction) => {value(jsonObject, successFunction, errorFunction);});
        next();
    }
}

export {
    chainChecks,
    chainChecksMiddleware
}
