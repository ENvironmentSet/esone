import Unary from '../index';

export interface Delete {
  readonly type: 'Delete';
  readonly target: Unary;
}

export function deleteOperator(target: Unary): Delete {
  return { type: 'Delete', target };
}

export default Delete;
