import Parser from '../Parser';
import { For, forStatement, Expression, VariableDeclaration } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { For as ForToken, LeftParenthesis, RightParenthesis, Semicolon, Var } from '../../Lexer';
import parseExpression from '../Expression';
import parseStatement from './parseStatement';
import { parseVariableDeclarations } from './parseVariable';
import composeTokenStates from '../composeTokenStates';

export const parseFor: Parser<For> = tokenState.chain(
  matchTokenFromLeft(ForToken),
  _ => tokenState.chain(
    matchTokenFromLeft(LeftParenthesis),
    _ => tokenState.chain(
      composeTokenStates<Expression | VariableDeclaration[] | undefined>(
        parseExpression,
        tokenState.chain(
          matchTokenFromLeft(Var),
          _ => parseVariableDeclarations
        ),
        tokenState.of(undefined)
      ),
      init => tokenState.chain(
        matchTokenFromLeft(Semicolon),
        _ => tokenState.chain(
          composeTokenStates(
            parseExpression,
            tokenState.of(undefined)
          ),
          condition => tokenState.chain(
            matchTokenFromLeft(Semicolon),
            _ => tokenState.chain(
              composeTokenStates(
                parseExpression,
                tokenState.of(undefined)
              ),
              loop => tokenState.chain(
                matchTokenFromLeft(RightParenthesis),
                _ => tokenState.map(
                  parseStatement,
                  body => forStatement(body, init, condition, loop)
                )
              )
            )
          )
        )
      )
    )
  )
);

export default parseFor;
