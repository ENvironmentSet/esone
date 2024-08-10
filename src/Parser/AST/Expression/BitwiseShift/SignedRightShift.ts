import Additive from '../Additive';
import BitwiseShift from './index';

export interface SignedRightShift {
  readonly type: 'SignedRightShift';
  readonly left: BitwiseShift;
  readonly right: Additive;
}

export function signedRightShift(left: BitwiseShift, right: Additive): SignedRightShift {
  return { type: 'SignedRightShift', left, right };
}

export default SignedRightShift;
