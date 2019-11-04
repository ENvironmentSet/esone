import Literal from './Literal';
import Grouping from './Grouping';
import IdentifierReference from './IdentifierReference';
import This from './This'

export * from './Literal';
export * from './Grouping';
export * from './IdentifierReference';
export * from './This'

export type Primary = Literal | Grouping | IdentifierReference | This;

export default Primary;
