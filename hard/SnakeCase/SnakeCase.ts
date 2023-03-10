type RecursiveSnakeCase<
    String extends string,
    Result extends string = ''
> = String extends `${infer First}${infer Other}`
    ? First extends Uppercase<First>
        ? RecursiveSnakeCase<Other, `${Result}_${Lowercase<First>}`>
        : RecursiveSnakeCase<Other, `${Result}${First}`>
    : Result;

type SnakeCase<String extends string> = RecursiveSnakeCase<String>;

type res1 = SnakeCase<"hello"> extends 'hello' ? true : false; // => "hello"
type res2 = SnakeCase<"userName">  extends 'user_name' ? true : false; // => "user_name"
type res3 = SnakeCase<"getElementById">  extends 'get_element_by_id' ? true : false; // => "get_element_by_id"


type L<T extends string> = [T] extends [string] ? T['length'] : never;

type F = L<'asdas'>;