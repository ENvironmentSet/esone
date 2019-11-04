import BitwiseXor from './BitwiseXor';

export type BitwiseOr = BitwiseXor |
  { readonly type: 'BitwiseOr', readonly left: BitwiseOr, readonly right: BitwiseXor };

export function bitwiseOr(left: BitwiseOr, right: BitwiseXor): BitwiseOr {
  return { type: 'BitwiseOr', left, right };
}

export default BitwiseOr;
