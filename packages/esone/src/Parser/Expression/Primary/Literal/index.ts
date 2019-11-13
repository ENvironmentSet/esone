import { Literal } from '../../../AST';
import Parser from '../../../Parser';
import parseBooleanLiteral from './parseBooleanLiteral';
import parseNullLiteral from './parseNullLiteral';
import parseNumericLiteral from './parseNumericLiteral';
import parseStringLiteral from './parseStringLiteral';
import composeTokenStates from '../../../composeTokenStates';

export const parseLiteral: Parser<Literal> = composeTokenStates<Literal>(
  parseBooleanLiteral,
  parseNullLiteral,
  parseNumericLiteral,
  parseStringLiteral
);

export default parseLiteral;
