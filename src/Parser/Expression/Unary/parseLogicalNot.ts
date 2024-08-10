import Parser from '../../Parser';
import { LogicalNot, logicalNot } from '../../AST';
import { tokenState } from '../../TokenState';
import matchTokenFromLeft from '../../matchTokenFromLeft';
import { LogicalNot as LogicalNotToken } from '../../../Lexer';
import parseUnary from './index';

export const parseLogicalNot: Parser<LogicalNot> = tokenState.chain(
  matchTokenFromLeft(LogicalNotToken),
  _ => tokenState.map(
    parseUnary,
    unaryExpression => logicalNot(unaryExpression)
  )
);

export default parseLogicalNot;
