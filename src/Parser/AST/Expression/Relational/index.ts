import BitwiseShift from '../BitwiseShift';
import GreaterThan from './GreaterThan';
import GreaterThanOrEqual from './GreaterThanOrEqual';
import LessThan from './LessThan';
import LessThanOrEqual from './LessThanOrEqual';

export * from './GreaterThan';
export * from './GreaterThanOrEqual';
export * from './LessThan';
export * from './LessThanOrEqual';

export type Relational = BitwiseShift | GreaterThan | GreaterThanOrEqual | LessThan | LessThanOrEqual

export default Relational;
