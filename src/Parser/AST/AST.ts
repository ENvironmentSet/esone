import Expression from './Expression';
import Declaration from './Declaration';
import Statement from './Statement'
import Program from './Program';

export type AST = Expression | Declaration | Statement | Program;

export default AST;
