export type IsPositive<T extends number> =
    `${T}` extends `-${infer M}`
        ? never
        : T

type Test1 = IsPositive<1>; //1
type Test2 = IsPositive<-10>; //never