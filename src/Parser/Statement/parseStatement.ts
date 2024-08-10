import Parser from '../Parser';
import { Statement } from '../AST';
import composeTokenStates from '../composeTokenStates';
import parseBlock from './parseBlock';
import parseBreak from './parseBreak';
import parseContinue from './parseContinue';
import parseEmpty from './parseEmpty';
import parseExpression from './parseExpression';
import parseFor from './parseFor';
import parseForIn from './parseForIn';
import parseIf from './parseIf';
import parseReturn from './parseReturn';
import parseVariable from './parseVariable';
import parseWhile from './parseWhile';
import parseWith from './parseWith';

//@TODO: Circular dep
export const parseStatement1: Parser<Statement> = composeTokenStates<Statement>(
  parseBlock,
  parseBreak,
  parseContinue,
  parseEmpty,
  parseExpression,
  parseFor,
  parseForIn,
  parseIf,
  parseReturn,
  parseVariable,
  parseWhile,
  parseWith
);

import { Token } from '../../Lexer';
import { Option } from 'fp-ts/lib/Option';

export function parseStatement(tokens: Token[]): Option<[Statement, Token[]]> {
  return parseStatement1(tokens);
}

export default parseStatement;
