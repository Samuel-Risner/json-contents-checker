import { CheckBooleanProps, CheckStringProps, CheckNumberProps, checkBoolean, checkNumber, checkString } from "./bigChecks";
import { chainChecks, chainChecksMiddleware } from "./check";
import SmallCheck from "./smallCheck";
import { CheckFunction, CheckReturn, ErrorFunction, JsonObject, Middleware, SuccessFunction, VerySmallCheckFunction } from "./types";
declare const _default: {
    bigChecks: {
        checkBoolean: typeof checkBoolean;
        checkNumber: typeof checkNumber;
        checkString: typeof checkString;
    };
    smallChecks: typeof SmallCheck;
    chain: {
        chainChecks: typeof chainChecks;
        chainChecksMiddleware: typeof chainChecksMiddleware;
    };
};
export default _default;
export { CheckReturn, ErrorFunction, SuccessFunction, JsonObject, VerySmallCheckFunction, Middleware, CheckFunction };
export { CheckBooleanProps, CheckNumberProps, CheckStringProps };
