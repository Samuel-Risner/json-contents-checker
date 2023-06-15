import tester from "./../tester";
import mockObject, { amountKeys } from "./mockObject";
import { errorFunction, successFunction } from "./funcs";

import {
    SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, // Small check classes

    checkBoolean, checkNumber, checkString, // The big check functions

    chainChecks, // Function for combining multiple checks into one
    chainChecksMiddleware, chainChecksMiddlewareCustom, // Function for chaining multiple checks together and using them as ExpressJS middleware

    errorFunctionDebug, errorFunctionDud, // Predefined error functions
    successFunctionDebug, successFunctionDud, // Predefined success functions

    // Types:
    ObjectToCheck, // The type for the object that you want to check

    CheckBooleanArgs, CheckStringArgs, CheckNumberArgs, // Arguments that the big check functions take
    
    CheckFunction, // The type for the function that you get returned by calling one of: checkString, checkBoolean, checkNumber
    CheckFunctionOnCheck,
    CheckFunctionOnCombine,
    CheckFunctionOnCreation,
    CheckReturn, // What you get returned from calling one of those functions ^

    CheckedRequest, // When using middleware in ExpressJS use "req: CheckedRequest" instead of "req: Request"
    CheckedRequestContents, // The attribute in ^ that was set by the middleware
    CheckedRequestEntry, // The value of ^

    Middleware, // The type of the function that chainChecksMiddleware returns

    ErrorFunction, SuccessFunction // The function types for the error and success functions

} from "@samuel-risner/json-contents-checker";
