import BitwiseAnd from './BitwiseAnd';

export type BitwiseXor = BitwiseAnd |
  { readonly type: 'BitwiseXor', readonly left: BitwiseXor, readonly right: BitwiseAnd };

export function bitwiseXor(left: BitwiseXor, right: BitwiseAnd): BitwiseXor {
  return { type: 'BitwiseXor', left, right };
}

export default BitwiseXor;
