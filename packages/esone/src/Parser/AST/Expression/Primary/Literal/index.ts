import BooleanLiteral from './BooleanLiteral';
import NullLiteral from './NullLiteral';
import NumericLiteral from './NumericLiteral';
import StringLiteral from './StringLiteral';

export * from './BooleanLiteral';
export * from './NullLiteral';
export * from './NumericLiteral';
export * from './StringLiteral';

export type Literal = BooleanLiteral | NullLiteral | NumericLiteral | StringLiteral;

export default Literal;
