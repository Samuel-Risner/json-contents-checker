# json-contents-checker

A npm package (for express.js) for checking the contents of a json object.

# Setup

Install the stuff:

```shell
npm install
```

Go to the folder that contains the "main" branch and run:

```shell
npm link
```

(Linux:)

```shell
sudo npm link
```

Then go to the folder that contains the "testing" branch and run:

```shell
npm link @samuel-risner/json-contents-checker
```

(Linux:)

```shell
sudo npm link @samuel-risner/json-contents-checker
```

# Do tests

```shell
npm test
```

<!--
    {
        "namePart": "",
        "expectedOutputs": [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ],
        "func": (key: string): CheckReturn => {
            return new SmallCheck(key)
            .combine()(mockObject, errorFunction, successFunction);
        }
    },

    {
        namePart: "",
        func: (key: string): CheckNumberArgs => {
            return { key: key, errorMsg: "-1" }
        },
        expected: [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },

    {
        namePart: "",
        func: (key: string): CheckStringArgs => {
            return { key: key, errorMsg: "-1" }
        },
        expected: [
            [false, -1, "-1"], // "some string"
            [false, -1, "-1"], // ""
            [false, -1, "-1"], // "some very very not too long string"
            [false, -1, "-1"], // 0
            [false, -1, "-1"], // 875
            [false, -1, "-1"], // -98
            [false, -1, "-1"], // 2.987
            [false, -1, "-1"], // -98.979
            [false, -1, "-1"], // true
            [false, -1, "-1"], // false
            [false, -1, "-1"], // undefined
            [false, -1, "-1"], // null
            [false, -1, "-1"], // Number.NaN
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER
            [false, -1, "-1"], // Number.MAX_SAFE_INTEGER + 1
            [false, -1, "-1"], // Number.MIN_SAFE_INTEGER - 1
        ]
    },
-->
