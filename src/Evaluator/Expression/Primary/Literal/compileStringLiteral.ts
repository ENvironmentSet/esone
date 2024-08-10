import { StringLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime } from '../../../Runtime/Runtime';
import { intro } from '../../../Runtime/intro';
import { ES1String } from '../../../Type/ES1String';

export const compileStringLiteral: (literal: StringLiteral) => Runtime<ES1String>
  = literal => intro(ES1String.ES1String(literal.value.lexeme));