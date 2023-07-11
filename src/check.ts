import { NextFunction, Response, Request } from "express";

import { CheckFunctionChain, CheckedRequest, CheckedRequestEntry, ErrorFunction, Middleware, SuccessFunction, ObjectToCheck, ChainResult } from "./types";

function chainChecks(
    objectToCheck: ObjectToCheck,
    ...checks: CheckFunctionChain[]
): () => ChainResult {
    return () => {
        const result: ChainResult = { error: false, separateChecks: {} };

        const errorFunction = (errorCode: number, errorMsg: string, key: string) => {
            result.separateChecks[key] = { code: errorCode, msg: errorMsg, error: true };
            result.error = true;
        }

        const successFunction = (successCode: number, successMsg: string, key: string) => {
            result.separateChecks[key] = { code: successCode, msg: successMsg, error: false };
        }
        
        checks.forEach((value: CheckFunctionChain) => {value(objectToCheck, errorFunction, successFunction);});
        return result;
    }
}

function chainChecksMiddleware(
    ...checks: CheckFunctionChain[]
): Middleware {
    return (req: CheckedRequest, res: Response, next: NextFunction) => {
        const objectToCheck: ObjectToCheck = req.body;

        if (!req["json-contents-checker"]) req["json-contents-checker"] = {error: false, separateChecks: {}};

        const errorFunction = (errorCode: number, errorMsg: string, key: string) => {
            (req["json-contents-checker"] as CheckedRequestEntry).separateChecks[key] = { code: errorCode, msg: errorMsg, error: true };
            (req["json-contents-checker"] as CheckedRequestEntry).error = true;
        }

        const successFunction = (successCode: number, successMsg: string, key: string) => {
            (req["json-contents-checker"] as CheckedRequestEntry).separateChecks[key] = { code: successCode, msg: successMsg, error: false };
        }
        
        checks.forEach((value: CheckFunctionChain) => {value(objectToCheck, errorFunction, successFunction);});
        next();
    }
}

function chainChecksMiddlewareCustom(
    getObjectToCheck: (req: Request, res: Response) => ObjectToCheck,
    ...checks: CheckFunctionChain[]
): Middleware {
    return (req: CheckedRequest, res: Response, next: NextFunction) => {
        const objectToCheck: ObjectToCheck = getObjectToCheck(req, res);

        if (!req["json-contents-checker"]) req["json-contents-checker"] = {error: false, separateChecks: {}};

        const errorFunction = (errorCode: number, errorMsg: string, key: string) => {
            (req["json-contents-checker"] as CheckedRequestEntry).separateChecks[key] = { code: errorCode, msg: errorMsg, error: true };
            (req["json-contents-checker"] as CheckedRequestEntry).error = true;
        }

        const successFunction = (successCode: number, successMsg: string, key: string) => {
            (req["json-contents-checker"] as CheckedRequestEntry).separateChecks[key] = { code: successCode, msg: successMsg, error: false };
        }
        
        checks.forEach((value: CheckFunctionChain) => {value(objectToCheck, errorFunction, successFunction);});
        next();
    }
}

export {
    chainChecks,
    chainChecksMiddleware,
    chainChecksMiddlewareCustom
}
