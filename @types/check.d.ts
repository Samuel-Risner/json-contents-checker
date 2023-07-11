import { Response, Request } from "express";
import { CheckFunctionChain, Middleware, ObjectToCheck, ChainResult } from "./types";
declare function chainChecks(objectToCheck: ObjectToCheck, ...checks: CheckFunctionChain[]): () => ChainResult;
declare function chainChecksMiddleware(...checks: CheckFunctionChain[]): Middleware;
declare function chainChecksMiddlewareCustom(getObjectToCheck: (req: Request, res: Response) => ObjectToCheck, ...checks: CheckFunctionChain[]): Middleware;
export { chainChecks, chainChecksMiddleware, chainChecksMiddlewareCustom };
