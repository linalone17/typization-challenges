type RecursiveModifier<
    B extends string,
    E extends string,
    M extends string[],
    Result extends unknown = never
> = M extends [infer First extends string, ...infer Other extends string[]]
    ? RecursiveModifier<
        B,
        E,
        Other,
        Result
        | `${
            B
        }${
            E['length'] extends 0
                ? ''
                : `__${E}`
        }${
            M['length'] extends 0
                ? ''
                : `--${First}`
        }`>
    : Result;

type RecursiveElement<
    B extends string,
    E extends string[],
    M extends string[],
    Result extends unknown = never
> = E extends [infer First extends string, ...infer Other extends string[]]
    ? RecursiveElement<B, Other, M, Result | RecursiveModifier<B, First, M>>
    : Result
;

export type BEM<
    B extends string,
    E extends string[],
    M extends string[]
> = E extends []
    ? RecursiveModifier<B, '', M>
    : RecursiveElement<B, E, M>
;

type Test = BEM<'foo', ['bar', 'baz'], ['la', 'lal', 'end']>
// "foo__bar--la" | "foo__bar--lal" | "foo__bar--end" |
// "foo__baz--la" | "foo__baz--lal" | "foo__baz--end"
