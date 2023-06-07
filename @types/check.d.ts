import { CheckFunction, ErrorFunction, Middleware, SuccessFunction, ObjectToCheck } from "./types";
declare function chainChecks(errorFunction: ErrorFunction, successFunction: SuccessFunction, objectToCheck: ObjectToCheck, ...checks: CheckFunction[]): () => void;
declare function chainChecksMiddleware(objectToCheck: ObjectToCheck, ...checks: CheckFunction[]): Middleware;
export { chainChecks, chainChecksMiddleware };
