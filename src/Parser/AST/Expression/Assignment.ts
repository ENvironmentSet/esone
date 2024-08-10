import Conditional from './Conditional';
import LeftHandSide from './LeftHandSide';
import { AssignAfterOperation, EqualSign } from '../../../Lexer';

export type AssignmentOnly = {
  readonly type: 'Assignment';
  readonly leftHandSide: LeftHandSide;
  readonly operation: AssignAfterOperation | EqualSign;
  readonly rightHandSide: Assignment;
};
export type Assignment = Conditional | AssignmentOnly

export function assignment(
  leftHandSide: LeftHandSide,
  operation: AssignAfterOperation | EqualSign,
  rightHandSide: Assignment
  ): Assignment {
  return { type: 'Assignment', leftHandSide, operation, rightHandSide };
}

export default Assignment;
