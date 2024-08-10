import { Token } from '../Lexer';
import { URI as optionURI, option, Option, none, getFirstMonoid } from 'fp-ts/lib/Option';
import { getStateM, StateM1, StateT1 } from 'fp-ts/lib/StateT';
import { Monoid } from 'fp-ts/lib/Monoid';
import { pipe } from 'fp-ts/lib/pipeable';

export type TokenState<A> = StateT1<optionURI, Token[], A>

export function getMonoid<A>(): Monoid<TokenState<A>> {
  return {
    empty(): Option<[A, Token[]]> {
      return none;
    },
    concat(matcher, alternative): TokenState<A> {
      const optionMonoid: Monoid<Option<[A, Token[]]>> = getFirstMonoid<[A, Token[]]>();

      return tokens => pipe(
        optionMonoid.concat(
          matcher(tokens),
          alternative(tokens)
        )
      );
    }
  };
}

export const tokenState: StateM1<optionURI> = getStateM(option);

export default TokenState;
