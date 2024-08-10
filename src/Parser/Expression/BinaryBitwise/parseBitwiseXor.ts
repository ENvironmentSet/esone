import { BitwiseXor, bitwiseXor } from '../../AST';
import Parser from '../../Parser';
import TokenState, { tokenState } from '../../TokenState';
import parseBitwiseAnd from './parseBitwiseAnd';
import composeTokenStates from '../../composeTokenStates';
import { BitwiseXor as BitwiseXorToken } from '../../../Lexer';
import { reduce, cons } from 'fp-ts/lib/Array';
import matchTokenFromLeft from '../../matchTokenFromLeft';

type Operation = (base: BitwiseXor) => BitwiseXor;

const parseOperations: TokenState<Operation[]> = composeTokenStates(
  tokenState.chain(
    matchTokenFromLeft(BitwiseXorToken),
    _ => tokenState.chain(
      parseBitwiseAnd,
      value => composeTokenStates(
        tokenState.map(
          parseOperations,
          operations => cons(base => bitwiseXor(base, value), operations)
        ),
        tokenState.of([base => bitwiseXor(base, value)])
      )
    )
  ),
  tokenState.of([] as Operation[])
);

export const parseBitwiseXor: Parser<BitwiseXor> = tokenState.chain(
  parseBitwiseAnd,
  operationBase => tokenState.map(
    parseOperations,
    reduce<Operation, BitwiseXor>(operationBase, (base, operation) => operation(base))
  ),
);

export default parseBitwiseXor;
