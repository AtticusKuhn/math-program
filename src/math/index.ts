type ExpressionT<T> = {
    value: Nop | T;
    arguements?: ExpressionT<T>[];
}

type Expression = ExpressionT<Nop>

type match = (number | RegExp)[]

interface Op {
    matches: match;
    parse: (input: string) => Maybe<Expression>;
    simplfy: () => this;
}

abstract class Nop {
    // matches: match;
    constructor(public matches: match, public name: string, public vals: Expression[] = []) {

    }
    parse(input: string): Maybe<Expression> {
        //console.log(this.matches)
        let cp_matches = this.matches;
        let sampleRegex = new RegExp(cp_matches.map(m => {
            if (typeof m === "number") {
                return "(.+?)"
            } else {
                return m.toString().substring(1, m.toString().length - 1);
            }
        }).join(""))
        console.log({ sampleRegex })
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
        return {
            value: this,
            arguements: mappedArgs,
        }
    }
    simplify() {

    }
}
class Plus extends Nop {
    matches: match = [1, /\+/, 2]
    constructor() {
        super([1, /\+/, 2], "plus")
    }
    simplify() {
        return this.vals
    }
}
class Minus extends Nop {
    matches: match = [1, /-/, 2]
    constructor() {
        super([1, /-/, 2], "minus")
    }
}
class Digit extends Nop {
    matches: match = [/[0-9]+/]
    value: number = 0;
    constructor() {
        super([/[0-9]+/], "digit")

    }
    parse(input: string): Maybe<Expression> {
        this.value = parseInt(input);
        return {
            value: this,
        }
    }

}

// let p = new Plus()
// p.parse("1+1")

const ops = [Plus, Minus, Digit]

type Maybe<T> = T | null;
const id = <T>(x: T) => x;
const sequence = <T>(xs: Maybe<T>[]): Maybe<T[]> => xs.every(id) ? (xs as T[]) : null;

const cls: Nop[] = ops.map(o => new o())

const parse = (input: string): Maybe<Expression> => {
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



const simplifiy = (expr: Expression): Expression => {
    return expr
}
console.log(JSON.stringify(parse("1+100"), null, 4))
try {
    Object.assign(window, { parse })
} catch { }