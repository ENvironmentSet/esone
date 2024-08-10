import Unary from '../index';

export interface Typeof {
  readonly type: 'Typeof';
  readonly target: Unary;
}

export function typeofOperator(target: Unary): Typeof {
  return { type: 'Typeof', target };
}

export default Typeof;
