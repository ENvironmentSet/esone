import { NumericLiteral, numericLiteral } from '../../../AST';
import { NumericLiteral as NumericLiteralToken } from '../../../../Lexer';
import Parser from '../../../Parser';
import { tokenState } from '../../../TokenState';
import matchTokenFromLeft from '../../../matchTokenFromLeft';

export const parseNumericLiteral: Parser<NumericLiteral> = tokenState.map(
  matchTokenFromLeft(NumericLiteralToken),
  numericLiteral
);

export default parseNumericLiteral;
