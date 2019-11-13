import BitwiseShift from '../BitwiseShift';
import Relational from './index';

export interface LessThanOrEqual {
  readonly type: 'LessThanOrEqual';
  readonly left: Relational;
  readonly right: BitwiseShift;
}

export function lessThanOrEqual(left: Relational, right: BitwiseShift): LessThanOrEqual {
  return { type: 'LessThanOrEqual', left, right };
}

export default LessThanOrEqual;
