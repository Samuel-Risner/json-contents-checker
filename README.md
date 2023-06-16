# json-contents-checker

A npm package (for ExpressJS) for checking the contents of an object which was parsed from a json string.

Wiki: https://github.com/Samuel-Risner/json-contents-checker/wiki

GitHub repo: https://github.com/Samuel-Risner/json-contents-checker

npm package: https://www.npmjs.com/package/@samuel-risner/json-contents-checker

# Installation

```shell
npm i @samuel-risner/json-contents-checker
```

# Quick overview

## Imports

```TypeScript
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
```

## Error and success functions

Whenever a check fails the error function is called and whenever one succeeds the success function is called.

You don't need to include any code in the functions.

Instead of making your own functions you can use the predefined ones:

 - errorFunctionDud & errorFunctionDud -> do nothing
 - errorFunctionDebug & successFunctionDebug -> same as the two implemented functions below

```TypeScript
import {
    errorFunctionDebug, errorFunctionDud, successFunctionDebug, successFunctionDud,
} from "@samuel-risner/json-contents-checker";
```

```TypeScript
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
```

## Use standalone checks

## Chain checks together

## Use chained checks in ExpressJS
