import {
    SmallCheckOnCheck, SmallCheckOnCombine, SmallCheckOnCreation, // Small check classes

    checkBoolean, checkNumber, checkString, // The big check functions

    chainChecks, // Function for combining multiple checks into one
    chainChecksMiddleware, chainChecksMiddlewareCustom, // Functions for chaining multiple checks together and using them as ExpressJS middleware

    errorFunctionDebug, errorFunctionDud, // Predefined error functions
    successFunctionDebug, successFunctionDud, // Predefined success functions

    // Types:
    ObjectToCheck, // The type for the object that you want to check

    CheckBooleanArgs, CheckStringArgs, CheckNumberArgs, // Props for the big check functions
    
    CheckFunctionChain, // The type for the function that you get returned by calling one of: "checkString", "checkBoolean", "checkNumber" or "combineChain" on a small check class

    CheckFunctionOnCheck, // The function that you get returned by calling "combine" on "SmallCheckOnCheck"
    CheckFunctionPreCheck, // The function that you get returned by calling "combine" on "SmallCheckOnCreation" or "SmallCheckOnCombine"

    CheckReturn, // What you get returned from calling one of those two function types ^
    SmallCheckArgs, // The arguments passed to the small check functions ("CheckFunctionOnCheck") or classes ("combine" on "SmallCheckOnCombine" or the constructor on "SmallCheckOnCreation")
    SmallCheckArgsOptional, // Special case of ^ needed for "SmallCheckOnCreation"

    CheckedRequest, // When using middleware in ExpressJS use "req: CheckedRequest" instead of "req: Request"
    CheckedRequestContents, // The attribute in ^ that was set by the middleware
    CheckedRequestEntry, // The value of ^

    Middleware, // The type of the function that chainChecksMiddleware returns

    ErrorFunction, SuccessFunction // The function types for the error and success functions
} from "@samuel-risner/json-contents-checker";
