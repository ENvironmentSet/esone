import Relational from '../Relational';
import Equality from './index';

export interface DoesNotEquals {
  readonly type: 'DoesNotEquals';
  readonly left: Equality;
  readonly right: Relational;
}

export function doesNotEquals(left: Equality, right: Relational): DoesNotEquals {
  return { type: 'DoesNotEquals', left, right };
}

export default DoesNotEquals;
