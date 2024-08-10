import Expression from '../Expression';
import Statement from './Statement';

export interface While {
  readonly type: 'While';
  readonly condition: Expression;
  readonly body: Statement;
}

export function whileStatement(condition: Expression, body: Statement): While {
  return { type: 'While', condition, body };
}

export default While;
