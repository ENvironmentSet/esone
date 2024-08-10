import { AST } from '../../Parser/AST';
import { error, Runtime } from './Runtime';
import { assertAST } from '../../Parser/AST';

//@TODO: Simplify chain of match
export function match<T extends AST, U>(astType: T['type'], then: (ast: T) => Runtime<U>, orElse?: (ast: AST) => Runtime<U>): (ast: AST) => Runtime<U> {
  return ast => assertAST(ast, astType) ? then(ast) : orElse ? orElse(ast) : error('AST 매칭 실패');
}
