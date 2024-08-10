import Additive from './index';

export interface Subtraction {
  readonly type: 'Subtraction';
  readonly left: Additive;
  readonly right: Additive;
}

export function subtraction(left: Additive, right: Additive): Subtraction {
  return { type: 'Subtraction', left, right };
}

export default Subtraction;
