import { ReversePolishNotationActionDict } from "./rpn.ohm-bundle";


function depth(arg1: any, arg2: any) {
  const L = arg1.stackDepth as StackDepth;
    const R = arg2.stackDepth as StackDepth;
    const maxBeforeOp = Math.max(L.max, L.out + R.max);
    const outBeforeOp = L.out + R.out;

  return { max: maxBeforeOp, out: outBeforeOp - 1 } as StackDepth;
} 


export const rpnStackDepth = {
    Expr(e) {
    return e.stackDepth as StackDepth;
  },

  Sum(arg1, arg2, _plus) {
    return depth(arg1, arg2) as StackDepth;
  },

  Mul(arg1, arg2, _times) {
    return depth(arg1, arg2) as StackDepth;
  },

  Stack(s) {
    return s.stackDepth as StackDepth;
  },

  number(_d) {
    return { max: 1, out: 1 } as StackDepth;
  }
} satisfies ReversePolishNotationActionDict<StackDepth>;
export type StackDepth = {max: number, out: number};
