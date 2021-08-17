export type Maybe<T> = T | null;
export const id = <T>(x: T) => x;
export const sequence = <T>(xs: Maybe<T>[]): Maybe<T[]> => xs.every(id) ? (xs as T[]) : null;
export const forceMaybe = <T>(m: Maybe<T>): T => {
    if (m)
        return m
    throw new Error("Tried to force a maybe failed as " + m);
}
export const constant = <T>(x: T) => () => x;