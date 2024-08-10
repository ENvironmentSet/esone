import { Relational, greaterThan, greaterThanOrEqual, lessThan, lessThanOrEqual } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseBitwiseShift from '../BitwiseShift';
import composeTokenStates from '../../composeTokenStates';
import { GreaterThan, StrictGreaterThan, LessThan, StrictLessThan } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: Relational) => Relational;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(StrictGreaterThan),
    _ => tokenState.chain(
      parseBitwiseShift,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => greaterThan(base, value), operations)
        ),
        tokenState.of([base => greaterThan(base, value)])
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(GreaterThan),
    _ => tokenState.chain(
      parseBitwiseShift,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => greaterThanOrEqual(base, value), operations)
        ),
        tokenState.of([base => greaterThanOrEqual(base, value)])
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(LessThan),
    _ => tokenState.chain(
      parseBitwiseShift,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => lessThanOrEqual(base, value), operations)
        ),
        tokenState.of([base => lessThanOrEqual(base, value)])
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(StrictLessThan),
    _ => tokenState.chain(
      parseBitwiseShift,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => lessThan(base, value), operations)
        ),
        tokenState.of([base => lessThan(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseRelational: Parser<Relational> = tokenState.chain(
  parseBitwiseShift,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, Relational>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseRelational;
