import Expression from '../Expression';
import Statement from './Statement';

export interface If {
  readonly type: 'If';
  readonly condition: Expression;
  readonly then: Statement;
  readonly elseClause?: Statement;
}

export function ifStatement(condition: Expression, then: Statement, elseClause?: Statement): If {
  return { type: 'If', condition, then, elseClause };
}

export default If;
