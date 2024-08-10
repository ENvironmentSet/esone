import AST from '../../Parser/AST';
import { Option } from 'fp-ts/Option';
import { empty, Runtime } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { compileExpression as compileExpressionExpression } from '../Expression/compileExpression';
import { compose } from '../Runtime/compose';

export const compileExpression: (expression: AST, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = expression => compose(compileExpressionExpression(expression), empty<ES1Value>());