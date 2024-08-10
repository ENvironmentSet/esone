import { BitwiseAnd, bitwiseAnd } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseEquality from '../Equality';
import composeTokenStates from '../../composeTokenStates';
import { BitwiseAnd as BitwiseAndToken } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: BitwiseAnd) => BitwiseAnd;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(BitwiseAndToken),
    _ => tokenState.chain(
      parseEquality,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => bitwiseAnd(base, value), operations)
        ),
        tokenState.of([base => bitwiseAnd(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseBitwiseAnd: Parser<BitwiseAnd> = tokenState.chain(
  parseEquality,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, BitwiseAnd>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseBitwiseAnd;
