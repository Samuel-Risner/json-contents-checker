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

- The big checks are functions that let you set the different check parameters in their arguments.

- The small checks are classes that use chaining to set the different check parameters.

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

    CheckReturn, // What you get returned from calling one of those two function types ^
    SmallCheckArgs, // The arguments passed to the small check functions ("CheckFunctionOnCheck") or classes ("combine" on "SmallCheckOnCombine" or the constructor on "SmallCheckOnCreation")
    SmallCheckArgsOptional, // Special case of ^ needed for "SmallCheckOnCreation"

    CheckedRequest, // When using middleware in ExpressJS use "req: CheckedRequest" instead of "req: Request"
    CheckedRequestContents, // The attribute in ^ that was set by the middleware
    CheckedRequestEntry, // The value of ^

    Middleware, // The type of the function that chainChecksMiddleware returns

    ErrorFunction, SuccessFunction // The function types for the error and success functions
} from "@samuel-risner/json-contents-checker";
```

## Error and success functions

Whenever a check fails or succeeds the error or success function is called. You can either define your functions or use the predefined ones.

### Predefined error and success functions:

```ts
import {
    errorFunctionDebug, successFunctionDebug,   // Do the same things as the two functions defined below.
    errorFunctionDud, successFunctionDud        // Do nothing.
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

You have three different classes for using the small checks. The difference between those classes is, when you pass the arguments for the object that you want to check, the key, success code, success message, error function and success function.

1. When evaluating the checks:

```ts
let someCheck: CheckFunctionOnCheck = new SmallCheckOnCheck()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine()

someCheck({ key: "key0", objectToCheck: mockObject });
```

2. When calling the function which returns to you the function for evaluating the checks:

```ts
let someCheck: CheckFunctionPreCheck = new SmallCheckOnCombine()
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine({ key: "key0", objectToCheck: mockObject })

someCheck();
```

3. When creating the object:

```ts
let someCheck: CheckFunctionPreCheck = new SmallCheckOnCreation({ key: "key0", objectToCheck: mockObject })
    .isString(-1, "The thing that you are trying to check isn't a string.")
    .maxLength(-2, "The string is too long", 5)
    .minLength(-3, "Ups! Too short.", 2)
    .combine()

someCheck();
```

In these three examples `combine()` was used to acquire another function which was then used to evaluate the checks.

If you want to skip this extra step you can use `evaluate()` or simply `()` to directly get the result:

## Chain checks together

## Use chained checks in ExpressJS

```ts

```
