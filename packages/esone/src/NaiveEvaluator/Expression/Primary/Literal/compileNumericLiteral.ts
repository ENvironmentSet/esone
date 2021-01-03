import { NumericLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime } from '../../../Runtime/Runtime';
import { intro } from '../../../Runtime/intro';
import { ES1Number } from '../../../Type/ES1Number';

export const compileNumericLiteral: (literal: NumericLiteral) => Runtime<ES1Number>
  = literal => intro(ES1Number.ES1Number(Number(literal.value.lexeme)));