import express, { Request, Response } from "express";

import { SmallCheckOnCheck, SmallCheckOnCombine, checkBoolean, chainChecksMiddlewareCustom, chainChecksMiddleware, CheckedRequest, CheckedRequestEntry, ObjectToCheck } from "@samuel-risner/json-contents-checker";

const port = 5000;
const app = express();

app.use(express.json());

app.post(
    "",
    chainChecksMiddlewareCustom(
        (req: Request, res: Response) => {
            const toCheck: ObjectToCheck | undefined = req.body.something;

            if (toCheck === undefined) return {};

            return toCheck;
        },
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
        console.log(checkResult);

        // Check if any check failed:
        const somethingFailed: boolean = checkResult.error;

        // Check the checks for the individual keys:
        const check0Result = checkResult.separateChecks["key0"];
        const check0Failed: boolean = check0Result.error;
        const check0Code: number = check0Result.code;
        const check0Msg: string = check0Result.msg;

        res.send("Hi!");
    }
);

app.listen(port, () => {console.log(`Server running on: http://localhost:${port}`);});
