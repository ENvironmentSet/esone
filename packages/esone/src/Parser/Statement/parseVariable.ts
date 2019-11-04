import Parser from '../Parser';
import { Variable, VariableDeclaration, variable, variableDeclaration } from '../AST';
import TokenState, { tokenState } from '../TokenState';
import matchTokenFromLeft from '../matchTokenFromLeft';
import { Var, EqualSign, Semicolon, Identifier } from '../../Lexer';
import { constant } from 'fp-ts/lib/function';
import composeTokenStates from '../composeTokenStates';
import { cons } from 'fp-ts/lib/Array';
import parseAssignment from '../Expression/parseAssignment';

export const parseVariableDeclaration: TokenState<VariableDeclaration> = tokenState.chain(
  matchTokenFromLeft(Identifier),
  identifier => composeTokenStates(
    tokenState.chain(
      matchTokenFromLeft(EqualSign),
      _ => tokenState.map(
        parseAssignment,
        assignment => variableDeclaration(identifier, assignment)
      )
    ),
    tokenState.of(variableDeclaration(identifier))
  )
);

export const parseVariableDeclarations: TokenState<VariableDeclaration[]> = composeTokenStates(
  tokenState.chain(
    parseVariableDeclaration,
    variableDec => tokenState.map(
      parseVariableDeclarations,
      variableDeclarations => cons(variableDec, variableDeclarations)
    )
  ),
  tokenState.of([] as VariableDeclaration[])
);

export const parseVariable: Parser<Variable> = tokenState.chain(
  matchTokenFromLeft(Var),
  _ => tokenState.chain(
    parseVariableDeclarations,
    variableDeclarations => tokenState.map(
      matchTokenFromLeft(Semicolon),
      constant(variable(variableDeclarations))
    )
  )
);

export default parseVariable;
