import Expression from '../Expression';

export interface Return {
  readonly type: 'Return';
  readonly value?: Expression;
}

export function returnStatement(value?: Expression): Return {
  return { type: 'Return', value };
}

export default Return;
