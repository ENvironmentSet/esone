import LeftHandSide from '../LeftHandSide';
import PostfixIncrement from './PostfixIncrement';
import PostfixDecrement from './PostfixDecrement';

export * from './PostfixIncrement';
export * from './PostfixDecrement';

export type Postfix = LeftHandSide | PostfixIncrement | PostfixDecrement

export default Postfix;
