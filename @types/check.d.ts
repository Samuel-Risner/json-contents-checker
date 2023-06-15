import { Response } from "express";
import { CheckFunctionChain, CheckedRequest, ErrorFunction, Middleware, SuccessFunction, ObjectToCheck } from "./types";
declare function chainChecks(errorFunction: ErrorFunction, successFunction: SuccessFunction, objectToCheck: ObjectToCheck, ...checks: CheckFunctionChain[]): () => void;
declare function chainChecksMiddleware(...checks: CheckFunctionChain[]): Middleware;
declare function chainChecksMiddlewareCustom(getObjectToCheck: (req: CheckedRequest, res: Response) => ObjectToCheck, ...checks: CheckFunctionChain[]): Middleware;
export { chainChecks, chainChecksMiddleware, chainChecksMiddlewareCustom };
