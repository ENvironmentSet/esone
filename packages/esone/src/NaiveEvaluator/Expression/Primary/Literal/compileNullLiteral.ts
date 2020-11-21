import { NullLiteral } from '../../../../Parser/AST/Expression/Primary/Literal';
import { Runtime, intro } from '../../../Runtime/Runtime';
import { constant } from 'fp-ts/function';
import { ES1Null } from '../../../Type/ES1Null';

export const compileNullLiteral: (nullLiteral: NullLiteral) => Runtime
  = constant(intro(ES1Null.ES1Null()));