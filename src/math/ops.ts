import { parse } from ".";
import { Maybe, sequence } from "./utils";

export type Expression = Nop; //ExpressionT<Nop>

type match = (number | RegExp)[]

interface Op {
    matches: match;
    parse: (input: string) => Maybe<Expression>;
    evaluate: () => number;
    toString: () => string;
}

export abstract class Nop implements Op {
    // matches: match;
    constructor(public matches: match, public name: string, public vals: (Expression)[] = []) {

    }
    parse(input: string): Maybe<Expression> {
        //console.log(this.matches)
        let cp_matches = this.matches;
        let sampleRegex = new RegExp(cp_matches.map(m => {
            if (typeof m === "number") {
                return "(.+)"
            } else {
                return m.toString().substring(1, m.toString().length - 1);
            }
        }).join(""))
        // console.log({ sampleRegex })
        let found = input.match(sampleRegex)
        if (!found) {
            return null;
        }
        found = [...found].slice(1)
        // console.log("found", found)
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
    evaluate() {
        return 0;
    }
    simplify() {
        return this;
    }
    toString() {
        return JSON.stringify(this, null, 4)
    }
}
class Plus extends Nop implements Op {
    matches: match = [1, /\+/, 2]
    constructor() {
        super([1, /\+/, 2], "plus")
    }
    toString() {
        return `${this.vals[0]}+${this.vals[1]}`;
    }
    evaluate() {
        return this.vals[0].evaluate() + this.vals[1].evaluate();
    }
}
class Minus extends Nop implements Op {
    matches: match = [1, /-/, 2]
    constructor() {
        super([1, /-/, 2], "minus")
    }
    evaluate() {
        return this.vals[0].evaluate() - this.vals[1].evaluate();
    }
    toString() {
        return `${this.vals[0]}-${this.vals[1].evaluate()}`;
    }
}
class Divides extends Nop implements Op {
    matches: match = [/\\frac{/, 1, /}{/, 2, /}/]
    constructor() {
        super([1, /-/, 2], "minus")
    }
    evaluate() {
        return this.vals[0].evaluate() / this.vals[1].evaluate();
    }
    toString() {
        return `${this.vals[0]}/${this.vals[1]}`;
    }
    simplify() {
        const [a, b] = reduceCommonFactors(this.vals[0], this.vals[1])
        this.vals;
        return this;
    }
}
class Digit extends Nop implements Op {
    matches: match = [/[0-9]+/]
    value: number = 69;
    constructor() {
        super([/[0-9]+/], "digit")

    }
    toString() {
        return this.value.toString();
    }
    evaluate() {
        return this.value
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

// let p = new Plus()
// p.parse("1+1")

export const ops = [Plus, Minus, Digit, Divides]

function reduceCommonFactors(a: Nop, b: Nop): [Nop, Nop] {
    const sa = a.simplify();
    const sb = b.simplify();
}
