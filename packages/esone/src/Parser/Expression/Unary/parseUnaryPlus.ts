import Parser from '../../Parser';
import { UnaryPlus, unaryPlus } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { PlusSign } from '../../../Lexer';
import parseUnary from './index';

export const parseUnaryPlus: Parser<UnaryPlus> = tokenState.chain(
  matchTokenFromLeft(PlusSign),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => unaryPlus(unaryExpression)
  )
);

export default parseUnaryPlus;
