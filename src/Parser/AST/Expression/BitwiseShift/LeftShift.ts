import Additive from '../Additive';
import BitwiseShift from './index';

export interface LeftShift {
  readonly type: 'LeftShift';
  readonly left: BitwiseShift;
  readonly right: Additive;
}

export function leftShift(left: BitwiseShift, right: Additive): LeftShift {
  return { type: 'LeftShift', left, right };
}

export default LeftShift;
