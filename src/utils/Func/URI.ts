declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    Func: Func<E, A>;
  }
}

export type Func<P, R> = (parameter: P) => R

export const URI = 'Func' as const;

export type URI = typeof URI;