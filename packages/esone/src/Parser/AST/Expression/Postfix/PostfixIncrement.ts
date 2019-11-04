import LeftHandSide from '../LeftHandSide';

export interface PostfixIncrement {
  readonly type: 'PostfixIncrement';
  readonly target: LeftHandSide;
}

export function postfixIncrement(target: LeftHandSide): PostfixIncrement {
  return { type: 'PostfixIncrement', target };
}

export default PostfixIncrement;
