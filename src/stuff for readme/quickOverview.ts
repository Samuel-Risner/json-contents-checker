// ## Imports

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

    ErrorFunction, SuccessFunction, // The function types for the error and success functions

    ChainResult, // What "chainChecks" returns
    ChainResultKey // Result in ^ for each checked key
} from "@samuel-risner/json-contents-checker";

// ## Error and success functions

// ### Define your own:

const errorFunction: ErrorFunction = (errorCode: number, errorMsg: string, key: string): void => {
    console.log(`❌ The check on '${key}' failed!`);
    console.log(`\t>>> Error code: ${errorCode}`);
    console.log(`\t>>> Error msg: '${errorMsg}'`);
    console.log();
}

function successFunction (successCode: number, successMsg: string, key: string): void {
    console.log(`✅ The check on '${key}' was successful!`);
    console.log(`\t>>> Success code: ${successCode}`);
    console.log(`\t>>> Success msg: '${successMsg}'`);
    console.log();
}

// ## Mock object

const mockObject: ObjectToCheck = {
    "key0": "some string",
    "key1": true,
    "key2": 0,
    "key3": 2.6
}

// ## Use standalone checks

// ### Small checks

const someCheck1: CheckFunctionOnCheck = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine();

const result1: CheckReturn = someCheck1({ key: "key0", objectToCheck: mockObject });

const someCheck2: CheckFunctionPreCheck = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine({ key: "key0", objectToCheck: mockObject });

const result2: CheckReturn = someCheck2();

const someCheck3: CheckFunctionPreCheck = new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine();

const result3: CheckReturn = someCheck3();

const otherResult1: CheckReturn = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .evaluate({ key: "key0", objectToCheck: mockObject });

const otherResult2: CheckReturn = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    ({ key: "key0", objectToCheck: mockObject });

const otherResult3: CheckReturn =  new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .__call__({});
