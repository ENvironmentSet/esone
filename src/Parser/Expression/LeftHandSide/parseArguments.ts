import { Arguments } from '../../AST';
import { LeftParenthesis, RightParenthesis, Comma } from '../../../Lexer';
import TokenState, { tokenState } from '../../TokenState';
import parseAssignment from '../parseAssignment';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { constant } from 'fp-ts/lib/function';
import { cons } from 'fp-ts/lib/Array';
import composeTokenStates from '../../composeTokenStates';

const parseArgumentList: TokenState<Arguments> = composeTokenStates(
  tokenState.chain(
    x => parseAssignment(x), //@Circular dep
    assignment => composeTokenStates(
      tokenState.chain(
        matchTokenFromLeft(Comma),
        _ => tokenState.map(
          parseArgumentList,
          assignments => cons(assignment, assignments)
        )
      ),
      tokenState.of([assignment])
    )
  ),
  tokenState.of([] as Arguments)
);

export const parseArguments: TokenState<Arguments> = tokenState.chain(
  matchTokenFromLeft(LeftParenthesis),
  _ => tokenState.chain(
    parseArgumentList,
    argumentList => tokenState.map(
      matchTokenFromLeft(RightParenthesis),
      constant(argumentList)
    )
  )
);

export default parseArguments;
