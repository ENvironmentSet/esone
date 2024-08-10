import BitwiseShift from '../BitwiseShift';
import Relational from './index';

export interface GreaterThanOrEqual {
  readonly type: 'GreaterThanOrEqual';
  readonly left: Relational;
  readonly right: BitwiseShift;
}

export function greaterThanOrEqual(left: Relational, right: BitwiseShift): GreaterThanOrEqual {
  return { type: 'GreaterThanOrEqual', left, right };
}

export default GreaterThanOrEqual;
