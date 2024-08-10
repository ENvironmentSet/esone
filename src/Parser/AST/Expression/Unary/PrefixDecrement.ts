import Unary from '../index';

export interface PrefixDecrement {
  readonly type: 'PrefixDecrement';
  readonly target: Unary;
}

export function prefixDecrement(target: Unary): PrefixDecrement {
  return { type: 'PrefixDecrement', target };
}

export default PrefixDecrement;
