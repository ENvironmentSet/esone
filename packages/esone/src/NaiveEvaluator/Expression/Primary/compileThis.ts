import This from '../../../Parser/AST/Expression/Primary';
import { ref, Runtime } from '../../Runtime/Runtime';
import { constant } from 'fp-ts/function';

export const compileThis: (thisKeyword: This) => Runtime = constant(ref('this'));