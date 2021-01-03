import { NullLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime } from '../../../Runtime/Runtime';
import { intro } from '../../../Runtime/intro';
import { constant } from 'fp-ts/function';
import { ES1Null } from '../../../Type/ES1Null';

export const compileNullLiteral: (nullLiteral: NullLiteral) => Runtime<ES1Null>
  = constant(intro(ES1Null.ES1Null()));