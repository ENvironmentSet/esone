import Arguments from './Arguments';
import Member from './Member';

export type New = Member |
  { readonly type: 'New', readonly newTarget: New, readonly argumentsList?: Arguments };

export function newOperator(newTarget: New, argumentsList?: Arguments): New {
  return { type: 'New', newTarget, argumentsList };
}

export default New;
