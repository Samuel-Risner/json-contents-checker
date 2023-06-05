import SmallCheck from "./smallCheck";
import { BigCheckFunction, ErrorFunction, JsonObject, Middleware, SuccessFunction } from "./types";
declare function chainSmallChecks(errorFunction: ErrorFunction, successFunction: SuccessFunction, jsonObject: JsonObject, ...checks: SmallCheck[]): () => void;
declare function chainBigChecks(errorFunction: ErrorFunction, successFunction: SuccessFunction, jsonObject: JsonObject, ...checks: BigCheckFunction[]): () => void;
declare function chainSmallChecksMiddleware(errorFunction: ErrorFunction, successFunction: SuccessFunction, jsonObject: JsonObject, ...checks: SmallCheck[]): Middleware;
declare function chainBigChecksMiddleware(errorFunction: ErrorFunction, successFunction: SuccessFunction, jsonObject: JsonObject, ...checks: BigCheckFunction[]): Middleware;
export { chainSmallChecks, chainBigChecks, chainSmallChecksMiddleware, chainBigChecksMiddleware };
