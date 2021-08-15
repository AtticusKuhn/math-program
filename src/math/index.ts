type Expression = {
    value: any
} | { arguments: Expression[] }


type match = RegExp | (number | RegExp)[]

interface Op {
    matches: match;
    parse: (input: string) => Maybe<{ result: Expression, rest: String }>;
}

abstract class Nop {
    // matches: match;
    constructor(public matches: match, public vals: any[] = []) {

    }
    parse(input: string): Maybe<{ result: Expression, rest: String }> {
        console.log(this.matches)
        let cp_matches = this.matches;
        let expr: Expression = {}
        while (cp_matches.length > 0) {

        }
        return {
            result: expr,
            rest: input,
        }
    }
}
class Plup extends Nop implements Op {
    matches: match = [1, /+/, 2]
    constructor() {
        super([1, /+/, 2])
    }
}
class Minus extends Nop implements Op {
    matches: match = [1, /+/, 2]
    constructor() {
        super([1, /+/, 2])
    }
}
class Digit extends Nop implements Op {
    matches: match = /[0-9]/

    constructor() {
        super(/[0-9]/)

    }

}


const ops = [Plus, Minus, Digit]

type Maybe<T> = T | null;

const parse = (input: string): Maybe<Expression> => {
    const cls: Nop[] = ops.map(o => new o())
    for (const cl of cls) {
    }
    return null
}



const simplifiy = (expr: Expression): Expression => {
    return expr
}
console.log(parse("1+2+3-3"))