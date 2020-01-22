import { BooleanLiteral, booleanLiteral } from '../../../AST';
import { Bool } from '../../../../Lexer';
import Parser from '../../../Parser';
import { tokenState } from '../../../TokenState';
import matchTokenFromLeft from '../../../matchTokenFromLeft';

export const parseBooleanLiteral: Parser<BooleanLiteral> = tokenState.map(
  matchTokenFromLeft(Bool),
  booleanLiteral
);

export default parseBooleanLiteral;
