import { With, withStatement } from '../AST';
import Parser from '../Parser';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { With as WithToken, LeftParenthesis, RightParenthesis } from '../../Lexer';
import parseExpression from '../Expression';
import parseStatement from './parseStatement';

export const parseWith: Parser<With> = tokenState.chain(
  matchTokenFromLeft(WithToken),
  _ => tokenState.chain(
    matchTokenFromLeft(LeftParenthesis),
    _ => tokenState.chain(
      parseExpression,
      environment => tokenState.chain(
        matchTokenFromLeft(RightParenthesis),
        _ => tokenState.map(
          parseStatement,
          body => withStatement(environment, body)
        )
      )
    )
  )
);

export default parseWith;
