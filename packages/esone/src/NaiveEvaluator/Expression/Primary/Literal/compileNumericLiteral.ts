import { NumericLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime, intro } from '../../../Runtime/Runtime';
import { ES1Number } from '../../../Type/ES1Number';

export const compileNumericLiteral: (numericLiteral: NumericLiteral) => Runtime
  = numericLiteral => intro(ES1Number.ES1Number(Number(numericLiteral.value.lexeme)));