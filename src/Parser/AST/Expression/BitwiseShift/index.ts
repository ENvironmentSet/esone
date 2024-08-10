import Additive from '../Additive';
import LeftShift from './LeftShift';
import SignedRightShift from './SignedRightShift';
import UnsignedRightShift from './UnsignedRightShift';

export * from './LeftShift';
export * from './SignedRightShift';
export * from './UnsignedRightShift';

export type BitwiseShift = Additive | LeftShift | SignedRightShift | UnsignedRightShift;

export default BitwiseShift;
