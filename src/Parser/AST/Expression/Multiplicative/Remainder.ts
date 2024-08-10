import Unary from '../Unary';
import Additive from './index';

export interface Remainder {
  readonly type: 'Remainder';
  readonly left: Additive,
  readonly right: Unary
}

export function remainder(left: Additive, right: Unary): Remainder {
  return { type: 'Remainder', left, right };
}

export default Remainder;
