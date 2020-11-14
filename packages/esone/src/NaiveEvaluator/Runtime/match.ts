import { AST } from '../../Parser/AST';
import { abrupt, Runtime, RuntimeError } from './Runtime';

export function match<T extends AST>(astType: T['type'], then: (ast: T) => Runtime, orElse?: (ast: AST) => Runtime): (ast: AST) => Runtime {
  return ast => ast.type === astType ? then(ast as T) : orElse ? orElse(ast) : abrupt(new RuntimeError('AST 매칭 실패'));
}
