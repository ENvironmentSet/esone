import { LogicalOr, logicalOr } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseLogicalAnd from './parseLogicalAnd';
import composeTokenStates from '../../composeTokenStates';
import { LogicalOr as LogicalOrToken } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: LogicalOr) => LogicalOr;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(LogicalOrToken),
    _ => tokenState.chain(
      parseLogicalAnd,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => logicalOr(base, value), operations)
        ),
        tokenState.of([base => logicalOr(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseLogicalOr: Parser<LogicalOr> = tokenState.chain(
  parseLogicalAnd,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, LogicalOr>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseLogicalOr;
