import Parser from '../../Parser';
import { Void, voidOperator } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { Void as VoidToken } from '../../../Lexer';
import parseUnary from './index';

export const parseVoid: Parser<Void> = tokenState.chain(
  matchTokenFromLeft(VoidToken),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => voidOperator(unaryExpression)
  )
);

export default parseVoid;
