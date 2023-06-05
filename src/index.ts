import SmallCheck from "./smallCheck";
import { chainBigChecks, chainSmallChecks } from "./check";
import { checkNumber } from "./bigChecks";

function errorFunction(errorCode: number, errorMsg: string) {
    console.log(errorCode, errorMsg);
}

function successFunction(successCode: number, successMsg: string) {
    console.log(successCode, successMsg);
}

chainSmallChecks(errorFunction, successFunction, {"test": 1},
    new SmallCheck("test").
    isBoolean(-1, "Value is not a boolean."),
    new SmallCheck("test2").
    isNaN(-1, "")
);

chainBigChecks(errorFunction, successFunction, {"test": 1, "test2": 0}, 
    checkNumber({errorCode:0, errorMsg:"", nameOfJsonAttribute:"test", successCode:0, successMsg:""}),
    checkNumber({errorCode:0, errorMsg:"", nameOfJsonAttribute:"test2", successCode:0, successMsg:""})
)();
