import { Boolean as BooleanToken } from '../../../../../Lexer';

export interface BooleanLiteral {
  readonly type: 'BooleanLiteral';
  readonly value: BooleanToken;
}

export function booleanLiteral(value: BooleanToken): BooleanLiteral {
  return { type: 'BooleanLiteral', value };
}

export default BooleanLiteral;
