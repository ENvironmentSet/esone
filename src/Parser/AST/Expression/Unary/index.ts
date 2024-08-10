import Postfix from '../Postfix';
import BitwiseNot from './BitwiseNot';
import Delete from './Delete';
import LogicalNot from './LogicalNot';
import PrefixDecrement from './PrefixDecrement';
import PrefixIncrement from './PrefixIncrement';
import Typeof from './Typeof';
import UnaryMinus from './UnaryMinus';
import UnaryPlus from './UnaryPlus';
import Void from './Void';

export * from '../Postfix';
export * from './BitwiseNot';
export * from './Delete';
export * from './LogicalNot';
export * from './PrefixDecrement';
export * from './PrefixIncrement';
export * from './Typeof';
export * from './UnaryMinus';
export * from './UnaryPlus';
export * from './Void';

export type Unary = Postfix | BitwiseNot | Delete |
                    LogicalNot | PrefixDecrement | PrefixIncrement |
                    Typeof | UnaryMinus | UnaryPlus | Void;

export default Unary;
