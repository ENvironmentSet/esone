import LeftHandSide from '../LeftHandSide';

export interface PostfixDecrement {
  readonly type: 'PostfixDecrement';
  readonly target: LeftHandSide;
}

export function postfixDecrement(target: LeftHandSide): PostfixDecrement {
  return { type: 'PostfixDecrement', target };
}

export default PostfixDecrement;
