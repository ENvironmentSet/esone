import BitwiseShift from '../BitwiseShift';
import Relational from './index';

export interface LessThan {
  readonly type: 'LessThan';
  readonly left: Relational;
  readonly right: BitwiseShift;
}

export function lessThan(left: Relational, right: BitwiseShift): LessThan {
  return { type: 'LessThan', left, right };
}

export default LessThan;
