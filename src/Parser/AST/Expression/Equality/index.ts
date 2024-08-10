import Relational from '../Relational';
import DoesNotEquals from './DoesNotEquals';
import Equals from './Equals';

export * from './DoesNotEquals';
export * from './Equals';

export type Equality = Relational | DoesNotEquals | Equals;

export default Equality;
