export type IsNegative<T extends number> =
    `${T}` extends `-${infer M}`
        ? T
        : never

type Test1 = IsNegative<-5>; //-5
type Test2 = IsNegative<12>; //never