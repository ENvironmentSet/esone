import Additive from '../Additive';
import BitwiseShift from './index';

export interface UnsignedRightShift {
  readonly type: 'UnsignedRightShift';
  readonly left: BitwiseShift;
  readonly right: Additive;
}

export function unsignedRightShift(left: BitwiseShift, right: Additive): UnsignedRightShift {
  return { type: 'UnsignedRightShift', left, right };
}

export default UnsignedRightShift;

