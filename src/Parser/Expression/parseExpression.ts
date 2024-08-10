import { Expression } from '../AST';
import Parser from '../Parser';
import parseComma from './parseComma'
import { Option } from 'fp-ts/lib/Option';
import { Token } from '../../Lexer/LexemeRecognizers/Token';

export const parseExpression1: Parser<Expression> = parseComma;
//@FIXME: Circular dep
export function parseExpression(tokens: Token[]): Option<[Expression, Token[]]> {
  return parseExpression1(tokens);
}

export default parseExpression;
