import Parser from '../Parser';
import { Return, returnStatement, Expression } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Return as ReturnToken, Semicolon } from '../../Lexer';
import parseExpression from '../Expression';
import composeTokenStates from '../composeTokenStates';
import { constant } from 'fp-ts/lib/function';

export const parseReturn: Parser<Return> = tokenState.chain(
  matchTokenFromLeft(ReturnToken),
  _ => tokenState.chain(
    composeTokenStates<Expression | undefined>(
      parseExpression,
      tokenState.of(undefined)
    ),
    result => tokenState.map(
      matchTokenFromLeft(Semicolon),
      constant(returnStatement(result))
    )
  )
);

export default parseReturn;
