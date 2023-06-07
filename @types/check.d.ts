import { CheckFunction, ErrorFunction, JsonObject, Middleware, SuccessFunction } from "./types";
declare function chainChecks(errorFunction: ErrorFunction, successFunction: SuccessFunction, jsonObject: JsonObject, ...checks: CheckFunction[]): () => void;
declare function chainChecksMiddleware(jsonObject: JsonObject, ...checks: CheckFunction[]): Middleware;
export { chainChecks, chainChecksMiddleware };
