import Unary from '../index';

export interface UnaryMinus {
  readonly type: 'UnaryMinus';
  readonly target: Unary;
}

export function unaryMinus(target: Unary): UnaryMinus {
  return { type: 'UnaryMinus', target };
}

export default UnaryMinus;
