import { CheckBooleanProps, CheckStringProps, CheckNumberProps, checkBoolean, checkNumber, checkString} from "./bigChecks";
import { chainChecks, chainChecksMiddleware } from "./check";
import SmallCheck from "./smallCheck";
import { CheckFunction, CheckReturn, ErrorFunction, JsonObject, Middleware, SuccessFunction, VerySmallCheckFunction } from "./types";

export default {
    bigChecks: {
        checkBoolean,
        checkNumber,
        checkString
    },
    smallChecks: SmallCheck,
    chain: {
        chainChecks,
        chainChecksMiddleware
    }
}

export {
    CheckReturn,
    ErrorFunction,
    SuccessFunction,
    JsonObject,

    VerySmallCheckFunction,

    Middleware,

    CheckFunction
}

export {
    CheckBooleanProps,
    CheckNumberProps,
    CheckStringProps
}
