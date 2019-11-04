import Parser from '../../Parser';
import { Typeof, typeofOperator } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { Typeof as TypeofToken } from '../../../Lexer';
import parseUnary from './index';

export const parseTypeof: Parser<Typeof> = tokenState.chain(
  matchTokenFromLeft(TypeofToken),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => typeofOperator(unaryExpression)
  )
);

export default parseTypeof;
