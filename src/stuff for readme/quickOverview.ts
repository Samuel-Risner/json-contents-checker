// ## Imports

import {
    SmallCheck, // The class for the small checks
    checkString, checkBoolean, checkNumber, // The big check functions

    chainChecks, // Function for combining multiple checks into one
    chainChecksMiddleware, // Function for chaining multiple checks together and using them as ExpressJS middleware

    errorFunctionDebug, errorFunctionDud, // Predefined error functions
    successFunctionDebug, successFunctionDud, // Predefined success functions

    // Types (that you probably won't need):

    ObjectToCheck, // The type for the object that you want to check

    CheckBooleanArgs, CheckStringArgs, CheckNumberArgs, // Arguments that the big check functions take

    CheckFunction, // The type for the function that you get returned by calling one of: SmallCheck.combine, checkString, checkBoolean, checkNumber
    CheckReturn, // what you get returned from calling that function ^

    CheckedRequest, // When using middleware in ExpressJS use "req: CheckedRequest" instead of "req: Request"
    CheckedRequestContents, // The attribute in ^ that was set by the middleware
    CheckedRequestEntry, // The value of ^
    Middleware, // The type of the function that chainChecksMiddleware returns

    ErrorFunction, SuccessFunction // The function types for the error and success functions
} from "@samuel-risner/json-contents-checker";

// ## Error and success functions

const errorFunction: ErrorFunction = (errorCode: number, errorMsg: string, key: string): void => {
    console.log(`❌ The check on '${key}' failed!`);
    console.log(`\t>>> Error code: ${errorCode}`);
    console.log(`\t>>> Error msg: '${errorMsg}'`);
    console.log();
}

function successFunction (successCode: number, successMsg: string, key: string): void {
    console.log(`✔ The check on '${key}' was successful!`);
    console.log(`\t>>> Success code: ${successCode}`);
    console.log(`\t>>> Success msg: '${successMsg}'`);
    console.log();
}

// ## Mock object

const mockObject = {
    "key0": "some string",
    "key1": true,
    "key2": 0,
    "key3": 2.6
}

// ## Use standalone checks

let someCheck = new SmallCheck("non existent key")
.isString(-1, "Oh no!")
.maxLength(-2, "The thing is too long", 5)
.minLength(-3, "Ups! Too short.", 2)
.combine();

someCheck(mockObject, errorFunction, successFunction);
// [false, -1, "Oh no!"]
// Because the key "non existent key" does not exist on the object.

someCheck = checkString({
    key: "key0",
    invalidChars: "xyz",
    maxLength: 16
})

someCheck(mockObject, errorFunction, successFunction);
// [true, 0, ""]

// ## Chain checks together
let someOtherCheck = chainChecks(errorFunction, successFunction, mockObject,
new SmallCheck("non existent key")
.isString(-1, "Oh no!")
.maxLength(-2, "The thing is too long", 5)
.minLength(-3, "Ups! Too short.", 2)
.combine(),

new SmallCheck("key2")
.isString(-1, "Oh no!")
.maxLength(-2, "The thing is too long", 5)
.minLength(-3, "Ups! Too short.", 2)
.combine(),

checkBoolean({
    key: "key1",
})
)

someOtherCheck();
// Returns nothing, the error and success functions are important.
// Chaining checks is more useful as ExpressJS middleware.

// ## Use chained checks in ExpressJS

import Express, {Request, Response} from "express";

const app = Express();

app.get(
    "index",
    chainChecksMiddleware(
        new SmallCheck("non existent key")
        .isString(-1, "Oh no!")
        .maxLength(-2, "The thing is too long", 5)
        .minLength(-3, "Ups! Too short.", 2)
        .combine(),

        new SmallCheck("key2")
        .isString(-1, "Oh no!")
        .maxLength(-2, "The thing is too long", 5)
        .minLength(-3, "Ups! Too short.", 2)
        .combine(),

        checkBoolean({
            key: "key1",
        })
    ),
    (req: CheckedRequest, res: Response) => {
        const checkResult = req["json-contents-checker"] as CheckedRequestEntry;
        // Check if any check failed:
        const somethingFailed: boolean = checkResult.error;

        // Check the checks for the individual keys:
        const check1Results = checkResult.separateChecks["non existent key"];
        const check1Failed: boolean = check1Results.error;
        const check1Code: number = check1Results.code;
        const check1Msg: string = check1Results.msg;

        // Do whatever you want with the information you now have.

    }
);
