// Small checks:
import OnCheck from "./smallChecks/onCheck";
import OnCombine from "./smallChecks/onCombine";
import OnCreation from "./smallChecks/onCreation";

export {
    OnCheck,
    OnCombine,
    OnCreation
}

// Big checks:
import { checkBoolean, checkNumber, checkString, CheckBooleanArgs, CheckStringArgs, CheckNumberArgs } from "./bigChecks";

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

    CheckFunction,
    CheckFunctionOnCheck,
    CheckFunctionOnCombine,
    CheckFunctionOnCreation,

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

    CheckFunction,
    CheckFunctionOnCheck,
    CheckFunctionOnCombine,
    CheckFunctionOnCreation,

    CheckedRequestEntry,
    CheckedRequestContents,
    CheckedRequest
}
