import BitwiseShift from '../BitwiseShift';
import Relational from './index';

export interface GreaterThan {
  readonly type: 'GreaterThan';
  readonly left: Relational;
  readonly right: BitwiseShift;
}

export function greaterThan(left: Relational, right: BitwiseShift): GreaterThan {
  return { type: 'GreaterThan', left, right };
}

export default GreaterThan;
