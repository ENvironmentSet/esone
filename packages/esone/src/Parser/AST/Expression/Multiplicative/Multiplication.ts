import Unary from '../Unary';
import Additive from './index';

export interface Multiplication {
  readonly type: 'Multiplication';
  readonly left: Additive,
  readonly right: Unary
}

export function multiplication(left: Additive, right: Unary): Multiplication {
  return { type: 'Multiplication', left, right };
}

export default Multiplication;

