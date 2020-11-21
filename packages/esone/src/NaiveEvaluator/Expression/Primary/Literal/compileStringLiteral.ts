import { StringLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime, intro } from '../../../Runtime/Runtime';
import { ES1String } from '../../../Type/ES1String';

export const compileStringLiteral: (stringLiteral: StringLiteral) => Runtime
  = stringLiteral => intro(ES1String.ES1String(stringLiteral.value.lexeme));