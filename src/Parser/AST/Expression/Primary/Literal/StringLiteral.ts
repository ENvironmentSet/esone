import { StringLiteral as StringLiteralToken } from '../../../../../Lexer';

export interface StringLiteral {
  readonly type: 'StringLiteral';
  readonly value: StringLiteralToken;
}

export function stringLiteral(value: StringLiteralToken): StringLiteral {
  return { type: 'StringLiteral', value };
}

export default StringLiteral;
