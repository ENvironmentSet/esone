import { Literal } from '../../../AST';
import Parser from '../../../Parser';
import parseBoolLiteral from './parseBoolLiteral';
import parseNullLiteral from './parseNullLiteral';
import parseNumericLiteral from './parseNumericLiteral';
import parseStringLiteral from './parseStringLiteral';
import composeTokenStates from '../../../composeTokenStates';

export const parseLiteral: Parser<Literal> = composeTokenStates<Literal>(
  parseBoolLiteral,
  parseNullLiteral,
  parseNumericLiteral,
  parseStringLiteral
);

export default parseLiteral;
