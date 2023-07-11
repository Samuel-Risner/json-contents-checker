// Small checks:
import SmallCheckOnCheck from "./smallChecks/smallCheckOnCheck";
import SmallCheckOnCombine from "./smallChecks/smallCheckOnCombine";
import SmallCheckOnCreation from "./smallChecks/smallCheckOnCreation";

export {
    SmallCheckOnCheck,
    SmallCheckOnCombine,
    SmallCheckOnCreation
}

// Big checks:

import { CheckBooleanProps, checkBoolean } from "./bigChecks/boolean";
import { CheckNumberProps, checkNumber } from "./bigChecks/number";
import { CheckStringProps, checkString } from "./bigChecks/string";

export {
    checkBoolean,
    checkNumber,
    checkString,

    CheckBooleanProps,
    CheckStringProps,
    CheckNumberProps
}

// Chain checks:
import { chainChecks, chainChecksMiddleware, chainChecksMiddlewareCustom } from "./check";

export {
    chainChecks,
    chainChecksMiddleware,
    chainChecksMiddlewareCustom,
}


// Functions:
import { errorFunctionDebug, successFunctionDebug, errorFunctionDud, successFunctionDud } from "./funcs";

export {
    errorFunctionDebug,
    successFunctionDebug,
    errorFunctionDud,
    successFunctionDud
}

// Types:
import {
    ObjectToCheck,
    CheckResult,
    ErrorFunction,
    SuccessFunction,

    // VerySmallCheckFunction,

    Middleware,

    CheckFunctionChain,
    CheckFunctionOnCheck,
    CheckFunctionPreCheck,

    SmallCheckProps,
    SmallCheckPropsOptional,

    CheckedRequestEntry,
    CheckedRequestContents,
    CheckedRequest,

    ChainResultKey,
    ChainResult
} from "./types";

export {
    ObjectToCheck,
    CheckResult,
    ErrorFunction,
    SuccessFunction,

    // VerySmallCheckFunction,

    Middleware,

    CheckFunctionChain,
    CheckFunctionOnCheck,
    CheckFunctionPreCheck,

    SmallCheckProps,
    SmallCheckPropsOptional,

    CheckedRequestEntry,
    CheckedRequestContents,
    CheckedRequest,

    ChainResultKey,
    ChainResult
}
