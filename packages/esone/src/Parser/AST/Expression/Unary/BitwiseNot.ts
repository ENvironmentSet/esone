import Unary from '../index';

export interface BitwiseNot {
  readonly type: 'BitwiseNot';
  readonly target: Unary;
}

export function bitwiseNot(target: Unary): BitwiseNot {
  return { type: 'BitwiseNot', target };
}

export default BitwiseNot;
