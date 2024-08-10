import { LogicalAnd, logicalAnd } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseBinaryBitwise from '../BinaryBitwise';
import composeTokenStates from '../../composeTokenStates';
import { LogicalAnd as LogicalAndToken } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: LogicalAnd) => LogicalAnd;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(LogicalAndToken),
    _ => tokenState.chain(
      parseBinaryBitwise,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => logicalAnd(base, value), operations)
        ),
        tokenState.of([base => logicalAnd(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseLogicalAnd: Parser<LogicalAnd> = tokenState.chain(
  parseBinaryBitwise,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, LogicalAnd>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseLogicalAnd;
