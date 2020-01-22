import { BoolLiteral, boolLiteral } from '../../../AST';
import { Bool } from '../../../../Lexer';
import Parser from '../../../Parser';
import { tokenState } from '../../../TokenState';
import matchTokenFromLeft from '../../../matchTokenFromLeft';

export const parseBoolLiteral: Parser<BoolLiteral> = tokenState.map(
  matchTokenFromLeft(Bool),
  boolLiteral
);

export default parseBoolLiteral;
