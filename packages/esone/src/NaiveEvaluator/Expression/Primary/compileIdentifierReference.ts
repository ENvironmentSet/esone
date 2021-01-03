import { IdentifierReference } from '../../../Parser/AST/Expression/Primary';
import { Runtime, get } from '../../Runtime/Runtime';
import { ES1Value } from '../../Type/ES1Value';

export const compileIdentifierReference: (identifierReference: IdentifierReference) => Runtime<ES1Value>
  = identifierReference => get(identifierReference.identifier.lexeme);