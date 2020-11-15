import { BoolLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime, intro } from '../../../Runtime/Runtime';
import { ES1Boolean } from '../../../Type/ES1Boolean';

export const compileBooleanLiteral: (booleanLiteral: BoolLiteral) => Runtime
  = booleanLiteral => intro(booleanLiteral.value.lexeme === 'true' ? ES1Boolean.ES1True() : ES1Boolean.ES1False());
