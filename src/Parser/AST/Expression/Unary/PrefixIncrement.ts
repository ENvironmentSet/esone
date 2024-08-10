import Unary from '../index';

export interface PrefixIncrement {
  readonly type: 'PrefixIncrement';
  readonly target: Unary;
}

export function prefixIncrement(target: Unary): PrefixIncrement {
  return { type: 'PrefixIncrement', target };
}

export default PrefixIncrement;
