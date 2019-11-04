import Parser from '../../Parser';
import { UnaryMinus, unaryMinus } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { MinusSign } from '../../../Lexer';
import parseUnary from './index';

export const parseUnaryMinus: Parser<UnaryMinus> = tokenState.chain(
  matchTokenFromLeft(MinusSign),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => unaryMinus(unaryExpression)
  )
);

export default parseUnaryMinus;
