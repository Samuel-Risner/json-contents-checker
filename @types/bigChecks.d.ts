import { BigCheckFunction } from "./types";
export { checkNumber };
type CheckNumberProps = {
    nameOfJsonAttribute: string;
    errorCode: number;
    errorMsg: string;
    successCode: number;
    successMsg: string;
    notUndefined?: boolean;
    notNull?: boolean;
    isSafe?: boolean;
    mayBeDecimal?: boolean;
    isNumber?: boolean;
    minValue?: number;
    maxValue?: number;
};
declare function checkNumber({ nameOfJsonAttribute, errorCode, errorMsg, successCode, successMsg, notUndefined, notNull, isSafe, mayBeDecimal, isNumber, minValue, maxValue }: CheckNumberProps): BigCheckFunction;
