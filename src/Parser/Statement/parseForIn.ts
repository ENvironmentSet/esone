import Parser from '../Parser';
import { ForIn, forIn, VariableDeclaration, LeftHandSide } from '../AST';
import { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { For, In, LeftParenthesis, RightParenthesis, Var } from '../../Lexer';
import parseExpression from '../Expression';
import parseStatement from './parseStatement';
import { parseVariableDeclaration } from './parseVariable';
import parseLeftHandSide from '../Expression/LeftHandSide';
import composeTokenStates from '../composeTokenStates';

export const parseForIn: Parser<ForIn> = tokenState.chain(
  matchTokenFromLeft(For),
  _ => tokenState.chain(
    matchTokenFromLeft(LeftParenthesis),
    _ => tokenState.chain(
      composeTokenStates<LeftHandSide | VariableDeclaration>(
        parseLeftHandSide,
        tokenState.chain(
          matchTokenFromLeft(Var),
          _ => parseVariableDeclaration
        )
      ),
      binding => tokenState.chain(
        matchTokenFromLeft(In),
        _ => tokenState.chain(
          parseExpression,
          rightHandSide => tokenState.chain(
            matchTokenFromLeft(RightParenthesis),
            _ => tokenState.map(
              parseStatement,
              body => forIn(binding, rightHandSide, body)
            )
          )
        )
      )
    )
  )
);

export default parseForIn;
