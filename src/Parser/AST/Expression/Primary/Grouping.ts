import Expression from '../Expression';

export interface Grouping {
  readonly type: 'Grouping';
  readonly expression: Expression;
}

export function grouping(expression: Expression): Grouping {
  return { type: 'Grouping', expression };
}

export default Grouping;
