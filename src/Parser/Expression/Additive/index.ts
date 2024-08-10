import { Additive, addition, subtraction } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseMultiplicative from '../Multiplicative';
import composeTokenStates from '../../composeTokenStates';
import { PlusSign, MinusSign } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { of } from 'fp-ts/NonEmptyArray';

type Operation = (base: Additive) => Additive;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(PlusSign),
    _ => tokenState.chain(
      parseMultiplicative,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => addition(base, value), operations)
        ),
        tokenState.of(of(base => addition(base, value)))
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(MinusSign),
    _ => tokenState.chain(
      parseMultiplicative,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => subtraction(base, value), operations)
        ),
        tokenState.of(of(base => subtraction(base, value)))
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseAdditive: Parser<Additive> = tokenState.chain(
  parseMultiplicative,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, Additive>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseAdditive;
