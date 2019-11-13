import Unary from '../Unary';
import Additive from './index';

export interface Division {
  readonly type: 'Division';
  readonly left: Additive,
  readonly right: Unary
}

export function division(left: Additive, right: Unary): Division {
  return { type: 'Division', left, right };
}

export default Division;
