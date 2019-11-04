import { BooleanLiteral, booleanLiteral } from '../../../AST';
import { Boolean } from '../../../../Lexer';
import Parser from '../../../Parser';
import { tokenState } from '../../../TokenState';
import matchTokenFromLeft from '../../../matchTokenFromLeft';

export const parseBooleanLiteral: Parser<BooleanLiteral> = tokenState.map(
  matchTokenFromLeft(Boolean),
  booleanLiteral
);

export default parseBooleanLiteral;
