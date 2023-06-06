import { NextFunction, Request, Response } from "express";
type CheckReturn = [boolean, number, string];
type ErrorFunction = (errorCode: number, errorMsg: string) => void;
type SuccessFunction = (successCode: number, successMsg: string) => void;
type JsonObject = {
    [key: string]: any;
};
type VerySmallCheckFunction = (toCheck: any) => boolean;
type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type CheckFunction = (jsonObject: JsonObject, errorFunction: ErrorFunction, successFunction: SuccessFunction) => CheckReturn;
export { CheckReturn, ErrorFunction, SuccessFunction, JsonObject, VerySmallCheckFunction, Middleware, CheckFunction };
