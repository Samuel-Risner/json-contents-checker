import { NextFunction, Request, Response } from "express";

import { CheckFunction, CheckReturn, ErrorFunction, JsonObject, Middleware, SuccessFunction } from "./types";

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
    errorFunction: ErrorFunction,
    successFunction: SuccessFunction,
    jsonObject: JsonObject,
    ...checks: CheckFunction[]
): Middleware {
    return (req: Request, res: Response, next: NextFunction) => {
        checks.forEach((value: CheckFunction) => {value(jsonObject, successFunction, errorFunction);});
        next();
    }
}

export {
    chainChecks,
    chainChecksMiddleware
}
