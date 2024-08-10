import { BitwiseOr, bitwiseOr } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseBitwiseXor from './parseBitwiseXor';
import composeTokenStates from '../../composeTokenStates';
import { BitwiseOr as BitwiseOrToken } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: BitwiseOr) => BitwiseOr;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(BitwiseOrToken),
    _ => tokenState.chain(
      parseBitwiseXor,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => bitwiseOr(base, value), operations)
        ),
        tokenState.of([base => bitwiseOr(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseBitwiseOr: Parser<BitwiseOr> = tokenState.chain(
  parseBitwiseXor,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, BitwiseOr>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseBitwiseOr;
