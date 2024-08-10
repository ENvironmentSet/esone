import BinaryBitwise from '../BinaryBitwise';

export type LogicalAnd = BinaryBitwise |
  { readonly type: 'LogicalAnd', readonly left: LogicalAnd, readonly right: BinaryBitwise };

export function logicalAnd(left: LogicalAnd, right: BinaryBitwise): LogicalAnd {
  return { type: 'LogicalAnd', left, right };
}

export default LogicalAnd;
