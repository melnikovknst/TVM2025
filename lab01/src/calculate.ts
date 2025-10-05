import { Dict, MatchResult, Semantics } from "ohm-js";
import grammar, { AddMulActionDict } from "./addmul.ohm-bundle";

export const addMulSemantics: AddMulSemantics = grammar.createSemantics() as AddMulSemantics;


const addMulCalc = {
    Expr(e) { 
        return e.calculate(); 
    },

    Sum(arg1, _plus, arg2) {
        var res = arg1.calculate();
        if (arg2.numChildren > 0)
            res += arg2.children[0].calculate();

        return res;
    },

    Mul(arg1, _times, arg2) {
        var res = arg1.calculate();
        if(arg2.numChildren > 0)
            res *= arg2.children[0].calculate();

        return res;
    },

    Paren(_lparen, expr, _rparen) {
        return expr.calculate()
    },

    Atom(a) { 
        return a.calculate(); 
    },

    number(_d) { 
        return Number(this.sourceString); 
    }
} satisfies AddMulActionDict<number>

addMulSemantics.addOperation<Number>("calculate()", addMulCalc);

interface AddMulDict  extends Dict {
    calculate(): number;
}

interface AddMulSemantics extends Semantics
{
    (match: MatchResult): AddMulDict;
}
