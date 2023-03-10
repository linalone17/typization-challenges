
type RecursiveCamelCase<
    String extends string,
    Result extends string = ''
> = String extends `${infer Left}_${infer Right}`
    ? Result['length'] extends 0
        ? RecursiveCamelCase<Right, Left>
        : RecursiveCamelCase<Right, `${Result}${Capitalize<Left>}`>
    : Result['length'] extends 0
        ? String
        : `${Result}${Capitalize<String>}`

export type CamelCase<String extends string> = RecursiveCamelCase<Lowercase<String>>;


type camelCase1 = CamelCase<'hello_world_with_tyPes'> // expected to be 'helloWorldWithTypes'
type camelCase2 = CamelCase<'HELLO_WoRLD_wITH_TYPES'> // expected to be same as previous one