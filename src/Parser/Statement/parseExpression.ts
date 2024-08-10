import Parser from '../Parser';
import { Expression } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Semicolon } from '../../Lexer';
import parsePureExpression from '../Expression';
import { constant } from 'fp-ts/lib/function';

export const parseExpression: Parser<Expression> = tokenState.chain(
  parsePureExpression,
  expression => tokenState.map(
    matchTokenFromLeft(Semicolon),
    constant(expression)
  )
);

export default parseExpression;
