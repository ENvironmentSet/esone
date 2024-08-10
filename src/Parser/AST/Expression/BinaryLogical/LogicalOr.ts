import LogicalAnd from './LogicalAnd';

export type LogicalOr = LogicalAnd |
  { readonly type: 'LogicalOr', readonly left: LogicalOr, readonly right: LogicalAnd };

export function logicalOr(left: LogicalOr, right: LogicalAnd): LogicalOr {
  return { type: 'LogicalOr', left, right };
}

export default LogicalOr;
