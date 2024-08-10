import Unary from '../index';

export interface LogicalNot {
  readonly type: 'LogicalNot';
  readonly target: Unary;
}

export function logicalNot(target: Unary): LogicalNot {
  return { type: 'LogicalNot', target };
}

export default LogicalNot;
