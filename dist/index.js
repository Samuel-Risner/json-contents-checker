"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const smallCheck_1 = __importDefault(require("./smallCheck"));
const check_1 = require("./check");
const bigChecks_1 = require("./bigChecks");
function errorFunction(errorCode, errorMsg) {
    console.log(errorCode, errorMsg);
}
function successFunction(successCode, successMsg) {
    console.log(successCode, successMsg);
}
(0, check_1.chainSmallChecks)(errorFunction, successFunction, { "test": 1 }, new smallCheck_1.default("test").
    isBoolean(-1, "Value is not a boolean."), new smallCheck_1.default("test2").
    isNaN(-1, ""));
(0, check_1.chainBigChecks)(errorFunction, successFunction, { "test": 1, "test2": 0 }, (0, bigChecks_1.checkNumber)({ errorCode: 0, errorMsg: "", nameOfJsonAttribute: "test", successCode: 0, successMsg: "" }), (0, bigChecks_1.checkNumber)({ errorCode: 0, errorMsg: "", nameOfJsonAttribute: "test2", successCode: 0, successMsg: "" }))();
