import Parser from '../Parser';
import { While, whileStatement } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { While as WhileToken, LeftParenthesis, RightParenthesis } from '../../Lexer';
import parseExpression from '../Expression';
import parseStatement from './parseStatement';

export const parseWhile: Parser<While> = tokenState.chain(
  matchTokenFromLeft(WhileToken),
  _ => tokenState.chain(
    matchTokenFromLeft(LeftParenthesis),
    _ => tokenState.chain(
      parseExpression,
      condition => tokenState.chain(
        matchTokenFromLeft(RightParenthesis),
        _ => tokenState.map(
          parseStatement,
          body => whileStatement(condition, body)
        )
      )
    )
  )
);

export default parseWhile;
