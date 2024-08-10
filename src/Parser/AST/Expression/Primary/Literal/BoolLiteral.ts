import { Bool as BoolToken } from '../../../../../Lexer';

export interface BoolLiteral {
  readonly type: 'BoolLiteral';
  readonly value: BoolToken;
}

export function boolLiteral(value: BoolToken): BoolLiteral {
  return { type: 'BoolLiteral', value };
}

export default BoolLiteral;
