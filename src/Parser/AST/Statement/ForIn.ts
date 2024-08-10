import LeftHandSide from '../Expression/LeftHandSide';
import { VariableDeclaration } from './Variable';
import Expression from '../Expression';
import Statement from './Statement';

export interface ForIn {
  readonly type: 'ForIn';
  readonly binding: LeftHandSide | VariableDeclaration;
  readonly rightHandSide: Expression;
  readonly body: Statement;
}

export { VariableDeclaration, variableDeclaration } from './Variable';

export function forIn(
  binding: LeftHandSide | VariableDeclaration,
  rightHandSide: Expression,
  body: Statement
): ForIn {
  return { type: 'ForIn', binding, rightHandSide, body };
}

export default ForIn;
