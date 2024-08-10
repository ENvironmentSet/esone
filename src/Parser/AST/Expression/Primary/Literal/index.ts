import BoolLiteral from './BoolLiteral';
import NullLiteral from './NullLiteral';
import NumericLiteral from './NumericLiteral';
import StringLiteral from './StringLiteral';

export * from './BoolLiteral';
export * from './NullLiteral';
export * from './NumericLiteral';
export * from './StringLiteral';

export type Literal = BoolLiteral | NullLiteral | NumericLiteral | StringLiteral;

export default Literal;
