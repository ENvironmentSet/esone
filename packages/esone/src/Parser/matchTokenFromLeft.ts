import { Token, LineTerminator } from '../Lexer';
import { dropLeftWhile, head } from 'fp-ts/lib/Array';
import { chain, map, fromPredicate } from 'fp-ts/lib/Option';
import TokenState, { tokenState } from './TokenState';
import { Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { tail } from '../utils/Array';
import { constant } from 'fp-ts/lib/function';

export function matchTokenFromLeft<A extends typeof Token>(target: A): TokenState<InstanceType<A>> {
  return tokenState.chain(
    tokenState.get(),
    (tokens: Token[]): TokenState<InstanceType<A>> => pipe(
      tokens,
      dropLeftWhile((token: Token): boolean => token instanceof LineTerminator),
      (trimmedTokens: Token[]): Option<[InstanceType<A>, Token[]]> => pipe(
        head(trimmedTokens),
        chain(fromPredicate((token: Token): token is InstanceType<A> => token instanceof target)),
        map((token: InstanceType<A>): [InstanceType<A>, Token[]] => [token, tail(trimmedTokens)])
      ),
      constant
    )
  );
}

export default matchTokenFromLeft;
