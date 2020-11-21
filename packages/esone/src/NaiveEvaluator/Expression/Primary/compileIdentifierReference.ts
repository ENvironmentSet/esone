import { IdentifierReference } from '../../../Parser/AST/Expression/Primary';
import { Runtime, ref } from '../../Runtime/Runtime';

export const compileIdentifierReference: (identifierReference: IdentifierReference) => Runtime
  = identifierReference => ref(identifierReference.identifier.lexeme);