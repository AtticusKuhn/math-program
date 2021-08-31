export type maybe<T> = T | null;
export const id = <T>(x: T) => x;

export type M<T> = T | null

export class Maybe<T> {
    constructor(public value: M<T>) { }
    getValue(): M<T> {
        return this.value
    }
    hasValue(): boolean {
        return !this.isNull()
    }
    isNull(): boolean {
        return this.value === null
    }
    force(message: string = "Tried to force a maybe"): T {
        if (this.value !== null) {
            return this.value
        } else {
            throw new Error(message)
        }
    }
    map<K>(f: (a: T) => K): Maybe<K> {
        const v = this.value === null ? null : f(this.value)
        return new Maybe(v)
    }
    else(defaultValue: T): T {
        if (this.value === null) {
            return defaultValue
        } else {
            return this.value
        }
    }
    bind<K>(f: (T: T) => Maybe<K>): Maybe<K> {
        if (this.value !== null) {
            return f(this.value)
        } else {
            return null as unknown as Maybe<K>
        }
    }
    show(): string {
        if (this.value === null) {
            return "Nothing"
        } else {
            return `Just ${JSON.stringify(this.value)}`
        }
    }
}

export const sequence = <T>(xs: Maybe<T>[]): Maybe<T[]> => {
    let x = new Maybe<T[]>([])
    for (const t of xs) {
        if (t.value === null) {
            return new Maybe<T[]>(null)
        } else {
            x.value!.push(t.value)
        }
    }
    return x
}
export const filterMaybe = <T>(xs: Maybe<T>[]): Maybe<T> => {
    let a = xs.filter(b => b.hasValue())
    if (a.length === 0) {
        return new Maybe<T>(null)
    } else {
        return a[0]
    }
}

export const constant = <T>(x: T) => () => x;
export const findGCD = (num1: number, num2: number): number => {
    let a = Math.abs(num1);
    let b = Math.abs(num2);
    while (a && b && a !== b) {
        if (a > b) {
            [a, b] = [a - b, b];
        } else {
            [a, b] = [a, b - a];
        };
    };
    return a || b;
};
export const reduce = (a: number, b: number): [number, number] => [a / findGCD(a, b), b / findGCD(a, b)]