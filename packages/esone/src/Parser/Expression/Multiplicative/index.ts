import { Multiplicative, division, multiplication, remainder } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseUnary from '../Unary';
import composeTokenStates from '../../composeTokenStates';
import { DivisionSign, MultiplicationSign, Remainder } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: Multiplicative) => Multiplicative;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(DivisionSign),
    _ => tokenState.chain(
      parseUnary,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => division(base, value), operations)
        ),
        tokenState.of([base => division(base, value)])
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(MultiplicationSign),
    _ => tokenState.chain(
      parseUnary,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => multiplication(base, value), operations)
        ),
        tokenState.of([base => multiplication(base, value)])
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(Remainder),
    _ => tokenState.chain(
      parseUnary,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => remainder(base, value), operations)
        ),
        tokenState.of([base => remainder(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseMultiplicative: Parser<Multiplicative> = tokenState.chain(
  parseUnary,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, Multiplicative>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseMultiplicative;
