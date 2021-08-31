// type ExpressionT<T> = {
//     value: Nop | T;
//     arguements?: ExpressionT<T>[];
// }

import { Expression, Nop, ops } from "./ops";
import { Maybe, reduce } from "./utils";






export const parse = (input: string): Maybe<Expression> => {
    //@ts-ignore
    const cls: Nop[] = ops.map(o => new o())

    const a = cls.find(cl => cl.parse(input).hasValue())
    return a ? a.parse(input) : new Maybe<Expression>(null);
    // for (const cl of cls) {
    //     let p = cl.parse(input)
    //     // cls.find
    //     if (p) {
    //         return p
    //     }
    // }
    // return null
}



const simplifiy = (expr: Expression): Expression => {
    return expr.evaluate()
}
reduce;
try {
    Object.assign(window, { parse, simplifiy, ops, reduce })
} catch { }