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

import { CheckBooleanArgs, checkBoolean } from "./bigChecks/boolean";
import { CheckNumberArgs, checkNumber } from "./bigChecks/number";
import { CheckStringArgs, checkString } from "./bigChecks/string";

export {
    checkBoolean,
    checkNumber,
    checkString,

    CheckBooleanArgs,
    CheckStringArgs,
    CheckNumberArgs
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
    CheckReturn,
    ErrorFunction,
    SuccessFunction,

    // VerySmallCheckFunction,

    Middleware,

    CheckFunctionChain,
    CheckFunctionOnCheck,
    CheckFunctionPreCheck,

    SmallCheckArgs,

    CheckedRequestEntry,
    CheckedRequestContents,
    CheckedRequest
} from "./types";

export {
    ObjectToCheck,
    CheckReturn,
    ErrorFunction,
    SuccessFunction,

    // VerySmallCheckFunction,

    Middleware,

    CheckFunctionChain,
    CheckFunctionOnCheck,
    CheckFunctionPreCheck,

    SmallCheckArgs,

    CheckedRequestEntry,
    CheckedRequestContents,
    CheckedRequest
}
