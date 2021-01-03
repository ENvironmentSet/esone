import { StringLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime } from '../../../Runtime/Runtime';
import { intro } from '../../../Runtime/intro';
import { ES1String } from '../../../Type/ES1String';

export const compileStringLiteral: (stringLiteral: StringLiteral) => Runtime<ES1String>
  = stringLiteral => intro(ES1String.ES1String(stringLiteral.value.lexeme));