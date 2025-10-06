import { MatchResult } from "ohm-js";
import grammar, { ArithmeticActionDict, ArithmeticSemantics } from "./arith.ohm-bundle";

export const arithSemantics: ArithSemantics = grammar.createSemantics() as ArithSemantics;


const arithCalc = {
    Expr(e) { 
        return e.calculate(this.args.params); 
    },

    AdditiveExp(first, ops, terms) {
        var res = first.calculate(this.args.params);
        const n = ops.numChildren;
        for (let i = 0; i < n; i++) {
            if (ops.child(i).sourceString == "+")
                res +=  terms.child(i).calculate(this.args.params);
            else
                res -=  terms.child(i).calculate(this.args.params);
        }

        return res;
    },

    TermExp(first, ops, factors) {
        var res = first.calculate(this.args.params);
        const n = ops.numChildren;
        for (let i = 0; i < n; i++) {
            if (ops.child(i).sourceString == "*")
                res *=  factors.child(i).calculate(this.args.params);
            else {
                const div = factors.child(i).calculate(this.args.params);
                if (div == 0)
                    throw new RangeError("Division by zero");
                res /=  div;
            }
        }

        return res;
    },

    Unary(sgn, expr) { 
        const minus_count = sgn.numChildren;
        if (minus_count % 2 == 0)
            return expr.calculate(this.args.params);
        return (-1) * expr.calculate(this.args.params); 
    },

    Atom(a) { 
        return a.calculate(this.args.params); 
    },

    Paren(_lparen, expr, _rparen) {
        return expr.calculate(this.args.params)
    },

    variable(v, tail) { 
        const name = v.sourceString + tail.sourceString;
        const var_list = this.args.params;
        if (!(name in var_list)) 
            return NaN;

        return var_list[name]; 
    },

    number(_d) { 
        return Number(this.sourceString); 
    }
} satisfies ArithmeticActionDict<number | undefined>;


arithSemantics.addOperation<Number>("calculate(params)", arithCalc);


export interface ArithActions {
    calculate(params: {[name:string]:number}): number;
}

export interface ArithSemantics extends ArithmeticSemantics
{
    (match: MatchResult): ArithActions;
}
