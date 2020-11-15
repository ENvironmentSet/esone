import { AST } from './AST';

export function assertAST<T extends AST>(ast: AST, type: T['type']): ast is T {
  return ast.type === type;
}