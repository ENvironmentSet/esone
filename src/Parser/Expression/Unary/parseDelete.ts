import Parser from '../../Parser';
import { Delete, deleteOperator } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { Delete as DeleteToken } from '../../../Lexer';
import parseUnary from './index';

export const parseDelete: Parser<Delete> = tokenState.chain(
  matchTokenFromLeft(DeleteToken),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => deleteOperator(unaryExpression)
  )
);

export default parseDelete;
