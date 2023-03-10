type RecursiveJoin<
    Delimeter extends string,
    Values extends string[],
    Result extends string = ''
> = Values extends [infer First extends string, ...infer Other extends string[]]
    ? Result extends ''
        ? RecursiveJoin<Delimeter, Other, `${First}`>
        : RecursiveJoin<Delimeter, Other, `${Result}${Delimeter}${First}`>
    : Result;

type Join<
    Delimeter extends string,
    Values extends string[]
> = Values['length'] extends 1
    ? Values[0]
    : RecursiveJoin<Delimeter, Values>;

function join<D extends string>(delimeter: D) {
    return function< A extends string[]>(...args: A): Join<D, A> {
        return args.join(delimeter) as Join<D, A>;
    }
}

const hyphenJoiner = join('-');
const result = hyphenJoiner('a', 'b', 'c', 'd');            // = 'a-b-c-d'
type Test = typeof result extends 'a-b-c-d' ? true : false; // true

const test1 = join('#')('a', 'b', 'c');                     // = 'a#b#c'
type Test1 = typeof test1 extends 'a#b#c' ? true : false;   //true

const test2 = join('')('a', 'b', 'c');                      // = 'abc'
type Test2 = typeof test2 extends 'abc' ? true : false;     //true

const test3 = join('-')('a')                                // = 'a'
type Test3 = typeof test3 extends 'a' ? true : false;       //true
