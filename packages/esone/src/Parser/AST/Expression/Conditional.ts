import BinaryLogical from './BinaryLogical';
import Assignment from './Assignment';

export type Conditional = BinaryLogical |
  { readonly type: 'Conditional',
    readonly condition: BinaryLogical,
    readonly trueBranch: Assignment,
    readonly falseBranch: Assignment,
  };

export function conditional(condition: BinaryLogical, trueBranch: Assignment, falseBranch: Assignment): Conditional {
  return { type: 'Conditional', condition, trueBranch, falseBranch };
}

export default Conditional;
