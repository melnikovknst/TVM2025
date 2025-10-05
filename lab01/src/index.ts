import {  MatchResult } from "ohm-js";
import { addMulSemantics } from "./calculate";
import grammar from "./addmul.ohm-bundle";

export function evaluate(content: string): number
{
    return calculate(parse(content));
}
export class SyntaxError extends Error
{
}

function parse(content: string): MatchResult
{
    const match = grammar.match(content);
    if (match.failed())
        throw new SyntaxError(match.shortMessage)
    
    return match;
}

function calculate(expression: MatchResult):number
{
    if (expression.failed())
        throw new SyntaxError(expression.shortMessage);

    return addMulSemantics(expression).calculate();
}