import Unary from '../index';

export interface Void {
  readonly type: 'Void';
  readonly target: Unary;
}

export function voidOperator(target: Unary): Void {
  return { type: 'Void', target };
}

export default Void;
