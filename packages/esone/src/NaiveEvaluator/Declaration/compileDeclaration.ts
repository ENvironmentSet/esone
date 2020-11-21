import Declaration from '../../Parser/AST/Declaration';
import { Runtime } from '../Runtime/Runtime';
import { compileFunction } from './compileFunction';

export const compileDeclaration: (declaration: Declaration) => Runtime = compileFunction;