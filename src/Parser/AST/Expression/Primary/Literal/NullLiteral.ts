export interface NullLiteral {
  readonly type: 'NullLiteral';
}

export function nullLiteral(): NullLiteral {
  return { type: 'NullLiteral' };
}

export default NullLiteral;
