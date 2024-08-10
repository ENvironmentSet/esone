import Multiplicative from '../Multiplicative';
import Addition from './Addition';
import Subtraction from './Subtraction';

export * from './Addition';
export * from './Subtraction';

export type Additive = Multiplicative | Addition | Subtraction;

export default Additive;
