import Statement from './Statement';
import Expression from '../Expression';

export interface With {
  readonly type: 'With';
  readonly value: Expression;
  readonly body: Statement
}

export function withStatement(value: Expression, body: Statement): With {
  return { type: 'With', value, body};
}

export default With;
