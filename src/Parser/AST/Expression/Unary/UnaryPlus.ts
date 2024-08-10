import Unary from '../index';

export interface UnaryPlus {
  readonly type: 'UnaryPlus';
  readonly target: Unary;
}

export function unaryPlus(target: Unary): UnaryPlus {
  return { type: 'UnaryPlus', target };
}

export default UnaryPlus;
