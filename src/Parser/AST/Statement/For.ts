import Expression from '../Expression';
import { VariableDeclaration } from './Variable';
import Statement from './Statement';

export interface For {
  readonly type: 'For';
  readonly init?: Expression | VariableDeclaration[];
  readonly condition?: Expression;
  readonly loop?: Expression;
  readonly body: Statement
}

export { VariableDeclaration, variableDeclaration } from './Variable';

export function forStatement(
  body: Statement,
  init?: Expression | VariableDeclaration[],
  condition?: Expression,
  loop?: Expression
): For {
  return { type: 'For', init, condition, loop, body };
}

export default For;
