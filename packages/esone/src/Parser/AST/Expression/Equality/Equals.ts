import Relational from '../Relational';
import Equality from './index';

export interface Equals {
  readonly type: 'Equals';
  readonly left: Equality;
  readonly right: Relational;
}

export function equals(left: Equality, right: Relational): Equals {
  return { type: 'Equals', left, right };
}

export default Equals;
