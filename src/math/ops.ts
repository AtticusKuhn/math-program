import { parse } from ".";
import { Maybe, sequence } from "./utils";

export type Expression = Nop; //ExpressionT<Nop>

type match = (number | RegExp)[]

interface Op {
    matches: match;
    parse: (input: string) => Maybe<Expression>;
    evaluate: () => Nop;
    simplify: () => Nop;

    toString: () => string;
}

export abstract class Nop {
    // matches: match;
    constructor(public matches: match, public name: string, public vals: (Expression)[] = []) {

    }
    parse(input: string): Maybe<Expression> {
        let cp_matches = this.matches;
        let sampleRegex = new RegExp(cp_matches.map(m => {
            if (typeof m === "number") {
                return "(.+)"
            } else {
                return m.toString().substring(1, m.toString().length - 1);
            }
        }).join(""))
        let found = input.match(sampleRegex)
        if (!found) {
            return null;
        }
        found = [...found].slice(1)
        const mappedArgs = sequence(found.map(parse))
        if (!mappedArgs) {
            return null
        }
        this.vals = mappedArgs
        return this;
        // return {
        //     value: this,
        //     arguements: mappedArgs,
        // }
    }
    evaluate(): Nop {
        return this;
    }
    simplify(): Nop {
        return this;
    }
    toString() {
        return JSON.stringify(this, null, 4)
    }
}
class Plus extends Nop implements Op {
    matches: match = [1, /\+/, 2]
    constructor(public a: Nop, public b: Nop) {
        super([1, /\+/, 2], "plus")
        this.vals = [a, b];
    }
    toString() {
        return `${this.vals[0]}+${this.vals[1]}`;
    }
    evaluate(): Nop {
        const a = this.vals[0].evaluate()
        const b = this.vals[1].evaluate();
        let x: Record<string, number> = {}
        const fillX = (t: Nop) => {
            if (t instanceof Digit)
                x.digit = (x.digit ?? 0) + t.value;
            if (t instanceof Variable)
                x[t.value.name] = (x[t.value.name] ?? 0) + t.value.v;
            if (t instanceof Plus) {
                for (const p of t.vals) {
                    fillX(p)
                }
            }
        }
        fillX(a)
        fillX(b)
        if (Object.keys(x).length === 1) {
            if (Object.keys(x)[0] === "digit") {
                return new Digit(x[Object.keys(x)[0]])
            } else {
                return new Variable({ v: x[Object.keys(x)[0]], name: Object.keys(x)[0] })
            }
        } else {
            let temp = (xs: Nop[]): Plus => xs.length === 2 ?
                new Plus(xs[0], xs[1]) :
                new Plus(xs[0], temp(xs.slice(1)))
            let xs: Nop[] = []
            for (const k of Object.keys(x)) {
                if (k === "digit") {
                    xs.push(new Digit(x[k]))
                } else {
                    xs.push(new Variable({
                        v: x[k],
                        name: k,
                    }))
                }
            }
            return temp(xs)
        }
    }
    // if (a instanceof Digit && b instanceof Digit)
    //     return new Digit(a.value + b.value)

    // if (a instanceof Variable && b instanceof Variable) {
    //     if (a.value.name === b.value.name) {
    //         return new Variable({
    //             v: a.value.v + b.value.v,
    //             name: a.value.name
    //         })
    //     } else {
    //         return this;
    //     }
    // }
    // if (a instanceof Plus) {

    // }
    // return this

}
class Minus extends Nop implements Op {
    matches: match = [1, /-/, 2]
    constructor() {
        super([1, /-/, 2], "minus")
    }
    evaluate(): Nop {
        const a = this.vals[0].evaluate()
        const b = this.vals[1].evaluate();
        if (a instanceof Digit && b instanceof Digit) {
            return new Digit(a.value - b.value)
        }
        if (a instanceof Variable && b instanceof Variable) {
            if (a.value.name === b.value.name) {
                return new Variable({
                    v: a.value.v - b.value.v,
                    name: a.value.name
                })
            } else {
                return this;
            }
        }
        return this;
    }
    toString() {
        return `${this.vals[0]}-${this.vals[1].evaluate()}`;
    }
}
class Divides extends Nop implements Op {
    matches: match = [/\\frac{/, 1, /}{/, 2, /}/]
    constructor(public vals: Nop[] = []) {
        super([1, /-/, 2], "minus", vals)
    }
    evaluate(): Nop {
        const a = this.vals[0].evaluate()
        const b = this.vals[1].evaluate();
        if (a.name === "digit" && b.name === "digit") {
            //@ts-ignore
            return new Digit(a.value / b.value)
        }
        return this
    }
    toString() {
        return `${this.vals[0]}/${this.vals[1]}`;
    }
    simplify() {
        const a = this.vals[0].simplify()
        const b = this.vals[0].simplify()
        if (a instanceof Digit && b instanceof Digit) {
            return new Divides([a, b])
        } else if (a instanceof Variable && b instanceof Variable) {
            return new Divides([a, b])
        }
        return this;
    }
}
class Digit extends Nop implements Op {
    matches: match = [/[0-9]+/]
    // value: number = 69;
    constructor(public value: number = 69) {
        super([/[0-9]+/], "digit")

    }
    toString() {
        return this.value.toString();
    }
    evaluate() {
        return this
    }
    parse(input: string): Maybe<Expression> {
        //@ts-ignore
        if (isNaN(input))
            return null
        this.value = parseInt(input);
        // this.vals = [parseInt(input)]
        return this
        // return {
        //     value: this,
        // }
    }
}

class Variable extends Nop implements Op {
    matches: match = [/[0-9]+[a-z]/]
    // value = 69;
    constructor(public value = { v: 69, name: "x" }) {
        super([/[0-9]+[a-z]/], "variable")

    }
    toString() {
        return `${this.value.v}${this.value.name}`
    }
    evaluate() {
        return this
    }
    parse(input: string): Maybe<Expression> {
        const match = input.match(/(?<val>[0-9]+)(?<name>[a-z])/)?.groups
        if (!match)
            return null
        //@ts-ignore
        const { val, name } = match
        if (!val || !name)
            return null
        this.value = {
            v: parseInt(val),
            name,
        }
        return this
    }
}

// let p = new Plus()
// p.parse("1+1")

export const ops = [Divides, Plus, Minus, Variable, Digit]

// function reduceCommonFactors(a: Nop, b: Nop): [Nop, Nop] {
//     const sa = a.simplify();
//     const sb = b.simplify();
// }
