type TrimLeft<Str extends string> =
    Str extends ` ${infer Substr}`
        ? TrimLeft<Substr>
        : Str

type TrimRight<Str extends string> =
    Str extends `${infer Substr} `
        ? TrimRight<Substr>
        : Str

export type Trim<Str extends string> = TrimRight<TrimLeft<Str>>;

type trimmed = Trim<'  Hello World  '> // 'Hello World'
type Test  = Trim<'    Friend   '> extends 'Friend' ? true : false; //true
