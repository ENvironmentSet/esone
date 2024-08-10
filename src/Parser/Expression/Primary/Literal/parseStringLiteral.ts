import { StringLiteral, stringLiteral } from '../../../AST';
import { StringLiteral as StringLiteralToken } from '../../../../Lexer';
import Parser from '../../../Parser';
import { tokenState } from '../../../TokenState';
import matchTokenFromLeft from '../../../matchTokenFromLeft';

export const parseStringLiteral: Parser<StringLiteral> = tokenState.map(
  matchTokenFromLeft(StringLiteralToken),
  stringLiteral
);

export default parseStringLiteral;
