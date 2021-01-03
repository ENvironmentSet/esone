import This from '../../../Parser/AST/Expression/Primary';
import { get, Runtime } from '../../Runtime/Runtime';
import { constant } from 'fp-ts/function';
import { ES1Value } from '../../Type/ES1Value';

export const compileThis: (thisKeyword: This) => Runtime<ES1Value> = constant(get('this'));