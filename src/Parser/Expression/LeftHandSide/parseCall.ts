import Parser from '../../Parser';
import { Call, call, member, Arguments } from '../../AST';
import composeTokenStates from '../../composeTokenStates';
import TokenState, { tokenState } from '../../TokenState';
import parseArguments from './parseArguments';
import parseMember from './parseMember';
import { LeftBracket, RightBracket, PropertyAccess, Identifier } from '../../../Lexer';
import parseExpression from '../parseExpression';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

const parseArgumentss: TokenState<Arguments[]> = composeTokenStates(
  tokenState.chain(
    parseArguments,
    argumentList => tokenState.map(
      parseArgumentss,
      argumentsLists => cons(argumentList, argumentsLists)
    ),
  ),
  tokenState.of([] as Arguments[])
);

export const parseCall: Parser<Call> = tokenState.chain(
  parseMember,
  baseCallee => tokenState.chain(
    tokenState.map(
      parseArgumentss,
      reduce<Arguments, Call>(baseCallee, (callee, argumentList) => call(callee, argumentList))
    ),
    topCallee => composeTokenStates(
      tokenState.chain(
        matchTokenFromLeft(LeftBracket),
        _ => tokenState.chain(
          parseExpression,
          expression => tokenState.map(
            matchTokenFromLeft(RightBracket),
            _ => member(topCallee, expression)
          )
        )
      ),
      tokenState.chain(
        matchTokenFromLeft(PropertyAccess),
        _ => tokenState.map(
          matchTokenFromLeft(Identifier),
          identifier => member(topCallee, identifier)
        )
      ),
      tokenState.of(topCallee)
    )
  )
);

export default parseCall;

