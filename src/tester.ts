import { CheckReturn } from "@samuel-risner/json-contents-checker";

class Tester {

    private passedTests: number;
    private failedTests: number;
    private criticalTests: number;

    constructor() {
        this.passedTests = 0;
        this.failedTests = 0;
        this.criticalTests = 0;
    }

    private passedTest(name: string, expectedOutput: CheckReturn, actualOutput: CheckReturn): true {
        console.log(`✅ Test passed for '${name}'!`);
        console.log(`\texpected output: [${expectedOutput}] actual output: [${actualOutput}]`);
        console.log();
        this.passedTests++;
        return true;
    }

    private failedTest(name: string, expectedOutput: CheckReturn, actualOutput: CheckReturn): false {
        console.log(`❌ Test failed for '${name}'!`);
        console.log(`\texpected output: [${expectedOutput}] actual output: [${actualOutput}]`);
        console.log();
        this.failedTests++;
        return false;
    }

    private criticalTest(name: string): false {
        console.log(`⛔ Test failed for '${name}'!`);
        console.log(`\tNo expected output was defined.`);
        console.log();
        this.criticalTests++;
        return false;
    }

    logResults() {
        console.log(`Tests in total: ${this.passedTests + this.failedTests}`);
        if (this.criticalTests > 0) {
            console.log(`\t⛔ Critical tests: ${this.criticalTests}`);
        }
        if (this.failedTests > 0) {
            console.log(`\t❌ Failed tests: ${this.failedTests}`);
        }
        console.log(`\t✅ Passed tests: ${this.passedTests}`);
    }

    test(name: string, expectedOutput: CheckReturn | undefined, testFunction:(key: string) => CheckReturn, key: string): boolean {
        const output = testFunction(key);

        if (expectedOutput === undefined) {
            this.criticalTest(name);
            return false;
        }

        for (let i = 0; i < expectedOutput.length; i++) {
            if (expectedOutput[i] !== output[i]) {
                this.failedTest(name, expectedOutput, output);
                return false;
            }
        }

        this.passedTest(name, expectedOutput, output);
        return true;
    }
}

export default new Tester();
