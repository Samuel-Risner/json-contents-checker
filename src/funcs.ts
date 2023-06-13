import { ErrorFunction, SuccessFunction } from "./types";

const errorFunctionDebug: ErrorFunction = (errorCode: number, errorMsg: string, key: string): void => {
    console.log(`❌ The check on '${key}' failed!`);
    console.log(`\t>>> Error code: ${errorCode}`);
    console.log(`\t>>> Error msg: '${errorMsg}'`);
    console.log();
}

const successFunctionDebug: SuccessFunction = (successCode: number, successMsg: string, key: string): void => {
    console.log(`✔ The check on '${key}' was successful!`);
    console.log(`\t>>> Success code: ${successCode}`);
    console.log(`\t>>> Success msg: '${successMsg}'`);
    console.log();
}

const errorFunctionDud: ErrorFunction = (errorCode: number, errorMsg: string, key: string): void => {}

const successFunctionDud: SuccessFunction = (successCode: number, successMsg: string, key: string): void => {}

export {
    errorFunctionDebug,
    successFunctionDebug,
    errorFunctionDud,
    successFunctionDud
}
