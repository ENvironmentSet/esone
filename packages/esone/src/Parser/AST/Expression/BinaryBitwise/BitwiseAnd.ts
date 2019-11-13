import Equality from '../Equality';

export type BitwiseAnd = Equality |
  { readonly type: 'BitwiseAnd', readonly left: BitwiseAnd, readonly right: Equality };

export function bitwiseAnd(left: BitwiseAnd, right: Equality): BitwiseAnd {
  return { type: 'BitwiseAnd', left, right };
}

export default BitwiseAnd;
