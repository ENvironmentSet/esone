import { Identifier } from '../../../Lexer';
import { Assignment } from '../Expression';

export interface VariableDeclaration {
  readonly type: 'VariableDeclaration';
  readonly identifier: Identifier;
  readonly initializer?: Assignment;
}

export function variableDeclaration(identifier: Identifier, initializer?: Assignment): VariableDeclaration {
  return { type: 'VariableDeclaration', identifier, initializer };
}

export interface Variable {
  readonly type: 'Variable';
  readonly variableDeclarationList: VariableDeclaration[];
}

export function variable(variableDeclarationList: VariableDeclaration[]): Variable {
  return { type: 'Variable', variableDeclarationList };
}

export default Variable;
