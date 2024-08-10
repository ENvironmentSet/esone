import { BitwiseShift, leftShift, signedRightShift, unsignedRightShift } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseAdditive from '../Additive';
import composeTokenStates from '../../composeTokenStates';
import { LeftShift, RightShift, UnsignedRightShift } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { of } from 'fp-ts/NonEmptyArray';

type Operation = (base: BitwiseShift) => BitwiseShift;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(LeftShift),
    _ => tokenState.chain(
      parseAdditive,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => leftShift(base, value), operations)
        ),
        tokenState.of(of(base => leftShift(base, value)))
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(RightShift),
    _ => tokenState.chain(
      parseAdditive,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => signedRightShift(base, value), operations)
        ),
        tokenState.of(of(base => signedRightShift(base, value)))
      )
    )
  ),
  tokenState.chain(
    matchTokenFromLeft(UnsignedRightShift),
    _ => tokenState.chain(
      parseAdditive,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => unsignedRightShift(base, value), operations)
        ),
        tokenState.of(of(base => unsignedRightShift(base, value)))
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseBitwiseShift: Parser<BitwiseShift> = tokenState.chain(
  parseAdditive,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, BitwiseShift>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseBitwiseShift;
