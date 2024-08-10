import { Comma, comma } from '../AST';
import Parser from '../Parser';
import TokenState, { tokenState } from '../TokenState';
import parseAssignment from './parseAssignment';
import composeTokenStates from '../composeTokenStates';
import { Comma as CommaToken } from '../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../matchTokenFromLeft';

type Operation = (base: Comma) => Comma;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(CommaToken),
    _ => tokenState.chain(
      parseAssignment,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => comma(base, value), operations)
        ),
        tokenState.of([base => comma(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseComma: Parser<Comma> = tokenState.chain(
  parseAssignment,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, Comma>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseComma;
