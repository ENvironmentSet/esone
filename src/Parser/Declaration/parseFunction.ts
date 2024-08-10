import Parser from '../Parser';
import { Fn, fn } from '../AST';
import TokenState, { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Fn as FnToken, Identifier, LeftParenthesis, RightParenthesis, Comma } from '../../Lexer';
import parseBlock from '../Statement/parseBlock';
import composeTokenStates from '../composeTokenStates';
import { cons } from 'fp-ts/lib/Array';

const parseFormalParameters: TokenState<Identifier[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(Identifier),
    identifier => composeTokenStates(
      tokenState.chain(
        matchTokenFromLeft(Comma),
        _ => tokenState.map(
          parseFormalParameters,
          formalParameters => cons(identifier, formalParameters)
        )
      ),
      tokenState.of([identifier])
    )
  ),
  tokenState.of([] as Identifier[])
);

export const parseFunction: Parser<Fn> = tokenState.chain(
  matchTokenFromLeft(FnToken),
  _ => tokenState.chain(
    matchTokenFromLeft(Identifier),
    identifier => tokenState.chain(
      matchTokenFromLeft(LeftParenthesis),
      _ => tokenState.chain(
        parseFormalParameters,
        formalParameters => tokenState.chain(
          matchTokenFromLeft(RightParenthesis),
          _ => tokenState.map(
            parseBlock,
            body => fn(identifier, formalParameters, body)
          )
        )
      )
    )
  )
);

export default parseFunction;
