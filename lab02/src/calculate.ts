import { ReversePolishNotationActionDict} from "./rpn.ohm-bundle";
import { Dict, MatchResult, Semantics } from "ohm-js";

export const rpnCalc = {
    Expr(e) {
        return e.calculate();
    },

    Sum(arg1, arg2, _plus) {
        var res = arg1.calculate() + arg2.calculate();

        return res;
    },

    Mul(arg1, arg2, _times) {
        var res = arg1.calculate() * arg2.calculate();

        return res;
    },

    Stack(s) {
        return s.calculate();
    },

    number(_d) { 
        return Number(this.sourceString); 
    }


} satisfies ReversePolishNotationActionDict<number>;