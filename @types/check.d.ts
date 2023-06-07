import { Response } from "express";
import { CheckFunction, CheckedRequest, ErrorFunction, Middleware, SuccessFunction, ObjectToCheck } from "./types";
declare function chainChecks(errorFunction: ErrorFunction, successFunction: SuccessFunction, objectToCheck: ObjectToCheck, ...checks: CheckFunction[]): () => void;
declare function chainChecksMiddleware(...checks: CheckFunction[]): Middleware;
declare function chainChecksMiddlewareCustom(getObjectToCheck?: (req: CheckedRequest, res: Response) => ObjectToCheck, ...checks: CheckFunction[]): Middleware;
export { chainChecks, chainChecksMiddleware, chainChecksMiddlewareCustom };
