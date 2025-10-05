import grammar from "./rpn.ohm-bundle";
import { rpnSemantics } from "./semantics";
import {  MatchResult } from "ohm-js";
import { StackDepth } from "./stackDepth";

export function evaluate(source: string): number
{ 
    return calculate(parse(source));
}
export function maxStackDepth(source: string): number
{ 
    const match = grammar.match(source);
    if (match.failed())
        throw new SyntaxError(match.shortMessage)

    const depth = rpnSemantics(match).stackDepth
    return depth.max;
}

export class SyntaxError extends Error
{
}

function parse(source: string): MatchResult
{
    const match = grammar.match(source);
    if (match.failed())
        throw new SyntaxError(match.shortMessage)
    
    return match;
}

function calculate(expression: MatchResult):number
{
    if (expression.failed())
        throw new SyntaxError(expression.shortMessage);

    return rpnSemantics(expression).calculate();
}