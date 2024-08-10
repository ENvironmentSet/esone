import { Identifier } from '../../../../Lexer/LexemeRecognizers';

export interface IdentifierReference {
  readonly type: 'IdentifierReference';
  readonly identifier: Identifier;
}

export function identifierReference(identifier: Identifier): IdentifierReference {
  return { type: 'IdentifierReference', identifier };
}

export default IdentifierReference;
