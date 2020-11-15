import { AST } from '../../Parser/AST';
import { abrupt, Runtime } from './Runtime';
import { assertAST } from '../../Parser/AST';

export function match<T extends AST>(astType: T['type'], then: (ast: T) => Runtime, orElse?: (ast: AST) => Runtime): (ast: AST) => Runtime {
  return ast => assertAST(ast, astType) ? then(ast) : orElse ? orElse(ast) : abrupt('AST 매칭 실패');
}
