import { NumericLiteral as NumericLiteralToken } from '../../../../../Lexer';

export interface NumericLiteral {
  readonly type: 'NumericLiteral';
  readonly value: NumericLiteralToken;
}

export function numericLiteral(value: NumericLiteralToken): NumericLiteral {
  return { type: 'NumericLiteral', value };
}

export default NumericLiteral;
