import Parser from '../Parser';
import { If, ifStatement } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { If as IfToken, LeftParenthesis, RightParenthesis, Else } from '../../Lexer';
import parseExpression from '../Expression';
import parseStatement from './parseStatement';
import composeTokenStates from '../composeTokenStates';

export const parseIf: Parser<If> = tokenState.chain(
  matchTokenFromLeft(IfToken),
  _ => tokenState.chain(
    matchTokenFromLeft(LeftParenthesis),
    _ => tokenState.chain(
      parseExpression,
      condition => tokenState.chain(
        matchTokenFromLeft(RightParenthesis),
        _ => tokenState.chain(
          parseStatement,
          trueBranch => composeTokenStates(
            tokenState.chain(
              matchTokenFromLeft(Else),
              _ => tokenState.map(
                parseStatement,
                falseBranch => ifStatement(condition, trueBranch, falseBranch)
              )
            ),
            tokenState.of(ifStatement(condition, trueBranch))
          )
        )
      )
    )
  )
);

export default parseIf;
