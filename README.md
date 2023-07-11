# json-contents-checker

An npm package (for ExpressJS) for checking the contents of an object which was parsed from a JSON string.

Wiki: https://github.com/Samuel-Risner/json-contents-checker/wiki

GitHub repo: https://github.com/Samuel-Risner/json-contents-checker

npm package: https://www.npmjs.com/package/@samuel-risner/json-contents-checker

# Installation

```shell
npm i @samuel-risner/json-contents-checker
```

# Quick Overview

## Before you start

When looking through the following examples you will notice that there are two kinds of checks, the big checks and the small ones:

- The big checks are functions that let you set the different check parameters in their props.

- The small checks are classes that use chaining to set the different checks.

Each kind has its different advantages and disadvantages, you can read more about them in the wiki.

## Imports

All the things that you can import:

```ts
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

    CheckResult, // The result from calling one of those two function types ^
    SmallCheckArgs, // The props passed to the small check functions ("CheckFunctionOnCheck") or classes ("combine" on "SmallCheckOnCombine" or the constructor on "SmallCheckOnCreation")
    SmallCheckArgsOptional, // Special case of ^ needed for "SmallCheckOnCreation"

    CheckedRequest, // When using middleware in ExpressJS use "req: CheckedRequest" instead of "req: Request"
    CheckedRequestContents, // The attribute in ^ that was set by the middleware
    CheckedRequestEntry, // The value of ^

    Middleware, // The type of the function that chainChecksMiddleware returns

    ErrorFunction, SuccessFunction // The function types for the error and success functions
} from "@samuel-risner/json-contents-checker";
```

## Error and success functions

Whenever a check fails or succeeds the error/success function is called. You can either define your own functions or use the predefined ones.

### Predefined error and success functions:

```ts
import {
    errorFunctionDud, successFunctionDud,       // Do nothing.
    errorFunctionDebug, successFunctionDebug    // Do the same things as the two functions defined below.
} from "@samuel-risner/json-contents-checker";
```

### Define your own:

```ts
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

When you look at the two functions you can see that their parameter types are the same, meaning that you can use the same function for either error or success cases.

## Mock object

In the following examples, this object will be used for demonstration purposes:

```ts
const mockObject: ObjectToCheck = {
    "key0": "some string",
    "key1": true,
    "key2": 0,
    "key3": 2.6
}
```

## Use standalone checks

### Small checks

You have three different classes for using the small checks. The difference between those classes is when you pass the props for the object that you want to check, the object, the key, success code, success message, error function and success function.

1. When evaluating the checks:

```ts
const someCheck: CheckFunctionOnCheck = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine();

const result: CheckResult = someCheck1({ key: "key0", objectToCheck: mockObject });
```

2. When calling the function which returns to you the function for evaluating the checks:

```ts
const someCheck: CheckFunctionPreCheck = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine({ key: "key0", objectToCheck: mockObject });

const result: CheckResult = someCheck2();
```

3. When creating the object:

```ts
const someCheck: CheckFunctionPreCheck = new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine();

const result: CheckResult = someCheck3();
```

In these three examples `.combine()` was used to acquire another function which was then used to evaluate the checks.

If you want to skip this extra step you can use `.evaluate()` or simply `()` (`.__call__()`) to directly get the result:

```ts
const result: CheckResult = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .evaluate({ key: "key0", objectToCheck: mockObject });
```

```ts
const result: CheckResult = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    ({ key: "key0", objectToCheck: mockObject });
```

```ts
const result: CheckResult =  new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .__call__({});
```

## Chain checks together

```ts
const combinedChecks = chainChecks(mockObject,
    new SmallCheckOnCheck()
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain("key0"),

    new SmallCheckOnCombine()
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain("key1"),

    new SmallCheckOnCreation({ key: "key2", objectToCheck: mockObject })
    .isString(-1, "Oh no!")
    .maxLength(-2, "The thing is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combineChain(),

    checkBoolean({
        key: "key3"
    })
)

const result: ChainResult = combinedChecks();
```

To see if any check failed:

```ts
const anyCheckFailed: boolean = result.error;
```

To check the result for a specific key:

```ts
const key0Result: ChainResultKey = result.separateChecks["key0"];
```

Note that `key0Result` could be undefined if there were no checks for it. If you would use multiple checks for the same key only the last one would have its result available in `result.separateChecks`.

You can see if a check for a key failed and get its error/success code and message by using:

```ts
const checkForKeyFailed: boolean = key0Result.error;
const codeForKey: number = key0Result.code;
const messageForKey: string = key0Result.msg;
```

## Use chained checks in ExpressJS

You can read more about chaining checks in ExpressJs in the [wiki](https://github.com/Samuel-Risner/json-contents-checker/wiki/ExpressJS-Middleware).

```ts
import express, { Request, Response } from "express";

import { SmallCheckOnCheck, SmallCheckOnCombine, checkBoolean, chainChecksMiddleware, CheckedRequest, CheckedRequestEntry } from "@samuel-risner/json-contents-checker";

const port = 5000;
const app = express();

app.use(express.json());

app.post(
    "",
    chainChecksMiddleware(
        new SmallCheckOnCombine()
        .isString(-1, "Oh no!")
        .maxLength(-2, "The thing is too long", 5)
        .minLength(-3, "Ups! Too short.", 2)
        .combineChain("key0"),

        new SmallCheckOnCheck()
        .isString(-1, "Oh no!")
        .maxLength(-2, "The thing is too long", 5)
        .minLength(-3, "Ups! Too short.", 2)
        .combineChain("key1"),

        checkBoolean({
            key: "key2"
        })
    ),
    (req: CheckedRequest, res: Response) => {
        const checkResult = req["json-contents-checker"] as CheckedRequestEntry;

        // Check if any check failed:
        const somethingFailed: boolean = checkResult.error;

        // Check the checks for the individual keys:
        const check0Result = checkResult.separateChecks["key0"];
        const check0Failed: boolean = check0Result.error;
        const check0Code: number = check0Result.code;
        const check0Msg: string = check0Result.msg;
    }
);

app.listen(port, () => {console.log(`Server running on: http://localhost:${port}`);});
```
