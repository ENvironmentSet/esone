import { notImplemented } from '../../Runtime/notImplemented';
import { New } from '../../../Parser/AST/Expression/LeftHandSide';
import { Runtime } from '../../Runtime/Runtime';
import { ES1Value } from '../../Type/ES1Value';

//@NotImplemented
export const compileNew: (ast: New) => Runtime<ES1Value> = notImplemented;