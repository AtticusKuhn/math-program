// type ExpressionT<T> = {
//     value: Nop | T;
//     arguements?: ExpressionT<T>[];
// }

import { Expression, Nop, ops } from "./ops";
import { Maybe, forceMaybe } from "./utils";






export const parse = (input: string): Maybe<Expression> => {
    const cls: Nop[] = ops.map(o => new o())

    const a = cls.find(cl => cl.parse(input))
    return a ? a.parse(input) : null;
    // for (const cl of cls) {
    //     let p = cl.parse(input)
    //     // cls.find
    //     if (p) {
    //         return p
    //     }
    // }
    // return null
}



const simplifiy = (expr: Expression): Number => {
    return expr.evaluate()
}
// console.log('JSON.stringify(parse("1+100"), null, 4) \n', JSON.stringify(parse("1+100"), null, 4))
console.log('simplifiy(forceMaybe(parse("\\frac{2}{4}"))) \n', simplifiy(forceMaybe(parse("\\frac{2}{4}"))))

try {
    Object.assign(window, { parse, simplifiy, ops })
} catch { }