import { Equality, equals, doesNotEquals } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseRelational from '../Relational';
import composeTokenStates from '../../composeTokenStates';
import { AbstractEquality, Inequality } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: Equality) => Equality;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(AbstractEquality),
    _ => tokenState.chain(
      parseRelational,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => equals(base, value), operations)
        ),
        tokenState.of([base => equals(base, value)])
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(Inequality),
    _ => tokenState.chain(
      parseRelational,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => doesNotEquals(base, value), operations)
        ),
        tokenState.of([base => doesNotEquals(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseEquality: Parser<Equality> = tokenState.chain(
  parseRelational,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, Equality>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseEquality;
