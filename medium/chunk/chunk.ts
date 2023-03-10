import {IsPositive} from "../../other";

type MoreThanOne<T extends number> =
    T extends IsPositive<T>
        ? T extends 0
            ? never
            : T
        : never

type CreateChunks<
    Arr extends any[],
    ChunkLen extends number,
    Result extends any[],
    Chunk extends any[]
    > = Chunk['length'] extends ChunkLen
        ? CreateChunks<Arr, ChunkLen, [...Result, Chunk], []>
        : Arr extends [infer First, ...infer Other]
            ? CreateChunks<Other, ChunkLen, Result, [...Chunk, First]>
            : Chunk['length'] extends 0
                ? Result
                : [...Result, Chunk];


export type Chunk<
    Arr extends any[],
    N extends number,
> = N extends MoreThanOne<N>
        ? CreateChunks<Arr, N, [], []>
        : never;

type T = Chunk<[1, 5, 6, 10], 1> // [[1], [5], [6], [10]]
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
