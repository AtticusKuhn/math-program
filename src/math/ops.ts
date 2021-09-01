import { parse } from ".";
import { filterMaybe, Maybe, reduce, sequence } from "./utils";

export type Expression = Nop; //ExpressionT<Nop>

type match = (number | RegExp)[]

interface Op {
    matches: match[];
    parse: (input: string) => Maybe<Expression>;
    evaluate: () => Nop;
    simplify: () => Nop;

    toString: () => string;
}

export abstract class Nop {
    // matches: match;
    constructor(public matches: match[], public name: string, public vals: (Expression)[] = []) {

    }
    parse(input: string): Maybe<Expression> {
        let temp = this.matches.map(match => {
            let sampleRegex = new RegExp(`^${match.map(m => {
                if (typeof m === "number") {
                    return "(.+)"
                } else {
                    return m.toString().substring(1, m.toString().length - 1);
                }
            }).join("")}$`)
            console.log("sampleRegex", sampleRegex)
            let found = input.match(sampleRegex)
            if (!found) {
                return new Maybe<string[]>(null);
            } else {
                return new Maybe<string[]>([...found].slice(1))
            }
        });
        const ma = filterMaybe(temp)
        if (ma.value === null) {
            return new Maybe<Expression>(null)
        } else {
            if (ma.value.length === 0) {
                return new Maybe<Expression>(null)
            } else {
                let found = ma.value;
                const mappedArgs = sequence(found.map(parse))
                if (mappedArgs.value === null) {
                    return new Maybe<Expression>(null)
                } else {
                    this.vals = mappedArgs.value
                    return new Maybe<Expression>(this);
                }
            }
        }
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
    matches: match[] = [[1, /\+/, 2]]
    constructor(public a: Nop, public b: Nop) {
        super([[1, /\+/, 2]], "plus")
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
}
class Minus extends Nop implements Op {
    matches: match[] = [[1, /-/, 2]]
    constructor() {
        super([[1, /-/, 2]], "minus")
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
    matches: match[] = [[/\\frac{/, 1, /}{/, 2, /}/], [1, /\//, 2]]
    constructor(public vals: Nop[] = []) {
        super([[/\\frac{/, 1, /}{/, 2, /}/], [1, /\//, 2]], "divides", vals)
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
    simplify(): Expression {
        const a = this.vals[0].simplify()
        const b = this.vals[1].simplify()
        if (a instanceof Digit && b instanceof Digit) {
            let x = reduce(a.value, b.value).map(e => new Digit(e))
            if (x[1].value === 1)
                return x[0]
            return new Divides(x)
        } else if (a instanceof Variable && b instanceof Variable) {
            const [na, nb] = reduce(a.value.v, b.value.v)
            return new Divides([
                new Variable({ name: a.name, v: na }),
                new Variable({ name: b.name, v: nb })
            ])
        }
        return this;
    }
}
class Times extends Nop implements Op {
    matches: match[] = [[1, /\*/, 2]]
    constructor(public vals: Nop[] = []) {
        super([[1, /\*/, 2]], "times", vals)
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
    simplify(): Expression {
        const a = this.vals[0].simplify()
        const b = this.vals[1].simplify()
        if (a instanceof Digit && b instanceof Digit) {

            return new Digit(a.value * b.value)
        } else if (a instanceof Variable && b instanceof Variable) {
        }
        return this;
    }
}
class Digit extends Nop implements Op {
    matches: match[] = [[/[0-9]+/]]
    // value: number = 69;
    constructor(public value: number = 69) {
        super([[/[0-9]+/]], "digit")

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
            return new Maybe<Expression>(null)
        this.value = parseInt(input);
        // this.vals = [parseInt(input)]
        return new Maybe<Expression>(this)
    }
}

class Variable extends Nop implements Op {
    matches: match[] = [[/[0-9]+[a-z]/]]
    // value = 69;
    constructor(public value = { v: 69, name: "x" }) {
        super([[/[0-9]+[a-z]/]], "variable")

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
            return new Maybe<Expression>(null)
        //@ts-ignore
        const { val, name } = match
        if (!val || !name)
            return new Maybe<Expression>(null)
        this.value = {
            v: parseInt(val),
            name,
        }
        return new Maybe<Expression>(this)
    }
}
class Parenthesis extends Nop implements Op {
    matches: match[] = [[/\(/, 1, /\)/]]
    // value: number = 69;
    constructor(public value: Nop) {
        super([[/\(/, 1, /\)/]], "parenthesis")
    }
    toString() {
        return `(${this.vals[0].toString()})`
    }
    evaluate() {
        console.log`in parenthis, this.vals[0] ${this.vals[0]}`
        return this.vals[0].evaluate();
    }
}
// let p = new Plus()
// p.parse("1+1")

export const ops = [Parenthesis, Times, Divides, Plus, Minus, Variable, Digit]

// function reduceCommonFactors(a: Nop, b: Nop): [Nop, Nop] {
//     const sa = a.simplify();
//     const sb = b.simplify();
// }
