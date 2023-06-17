import tester from "./tester";
import doChecksSmall from "./tests/small";
import doChecksBigBoolean from "./tests/bigBoolean";
import doChecksBigNumber from "./tests/bigNumber";
import doChecksBigString from "./tests/bigString";

doChecksSmall();
doChecksBigBoolean();
doChecksBigNumber();
// doChecksBigString();
tester.logResults();
