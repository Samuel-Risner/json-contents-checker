import { NextFunction, Request, Response } from "express";

import SmallCheck from "./smallCheck";
import { BigCheckFunction, CheckReturn, ErrorFunction, JsonObject, Middleware, SmallCheckFunction, SuccessFunction } from "./types";

function chainSmallChecks(
    errorFunction: ErrorFunction,
    successFunction: SuccessFunction,
    jsonObject: JsonObject,
    ...checks: SmallCheck[]
): () => void {
    const combinedChecks: SmallCheckFunction[] = [];

    checks.forEach((value: SmallCheck) => {
        combinedChecks.push(value.combine(errorFunction, successFunction));
    })

    return () => {
        combinedChecks.forEach((value: (jsonObject: JsonObject) => CheckReturn) => {value(jsonObject);});
    }
}

function chainBigChecks(
    errorFunction: ErrorFunction,
    successFunction: SuccessFunction,
    jsonObject: JsonObject,
    ...checks: BigCheckFunction[]
): () => void {

    return () => {
        checks.forEach((value: BigCheckFunction) => {value(jsonObject, successFunction, errorFunction);});
    }
}

function chainSmallChecksMiddleware(
    errorFunction: ErrorFunction,
    successFunction: SuccessFunction,
    jsonObject: JsonObject,
    ...checks: SmallCheck[]
): Middleware {
    const combinedChecks: SmallCheckFunction[] = [];

    checks.forEach((value: SmallCheck) => {
        combinedChecks.push(value.combine(errorFunction, successFunction));
    })

    return (req: Request, res: Response, next: NextFunction) => {
        combinedChecks.forEach((value: (jsonObject: JsonObject) => CheckReturn) => {value(jsonObject);});
        next();
    }
}

function chainBigChecksMiddleware(
    errorFunction: ErrorFunction,
    successFunction: SuccessFunction,
    jsonObject: JsonObject,
    ...checks: BigCheckFunction[]
): Middleware {

    return (req: Request, res: Response, next: NextFunction) => {
        checks.forEach((value: BigCheckFunction) => {value(jsonObject, successFunction, errorFunction);});

        next();
    }
}

export {
    chainSmallChecks,
    chainBigChecks,
    chainSmallChecksMiddleware,
    chainBigChecksMiddleware
}
