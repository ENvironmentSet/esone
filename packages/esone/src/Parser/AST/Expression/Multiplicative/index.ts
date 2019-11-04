import Unary from '../Unary';
import Division from './Division';
import Multiplication from './Multiplication';
import Remainder from './Remainder';

export * from './Division';
export * from './Multiplication';
export * from './Remainder';

export type Multiplicative = Unary | Division | Multiplication | Remainder

export default Multiplicative;
