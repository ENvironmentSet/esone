import TokenState, { getMonoid } from './TokenState';
import { Monoid } from 'fp-ts/lib/Monoid';
import { pipe } from 'fp-ts/lib/pipeable';
import { reduce } from 'fp-ts/lib/Array';

export function composeTokenStates<A>(...tokenStates: TokenState<A>[]): TokenState<A> {
  const { empty, concat }: Monoid<TokenState<A>> = getMonoid<A>();

  return pipe(
    tokenStates,
    reduce(empty, concat)
  );
}

export default composeTokenStates;
