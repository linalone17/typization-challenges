export type Trunc<T extends number> =
    `${T}` extends `${infer Integer extends number}.${any}`
        ? Integer
        : T

type Test1 = Trunc<13.23>; // 13
type Test2 = Trunc<15>; // 15
