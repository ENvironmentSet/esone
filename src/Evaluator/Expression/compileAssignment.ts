import { AssignmentOnly } from '../../Parser/AST';
import { Runtime, error } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { compileAdditive } from './Additive/compileAdditive';
import { match } from '../Runtime/match';
import { AST } from '../../Parser/AST';
import { extendWithValue } from '../Runtime/extendWithValue';
import { compileLeftHandSide } from './LeftHandSide/compileLeftHandSide';
import { EqualSign } from '../../Lexer/LexemeRecognizers/OperatorRecognizers';
import { ES1Reference } from '../Type/ES1Reference';
import { getValue } from '../Runtime/getValue';

//@TODO: Implement further logic
export const compileAssignment: (assignment: AST) => Runtime<ES1Value> = match<AssignmentOnly, ES1Value>(
  'Assignment',
  ({ leftHandSide, operation, rightHandSide }) => operation instanceof EqualSign ? extendWithValue(
    compileLeftHandSide(leftHandSide),
    leftHandSide => extendWithValue(
      compileAdditive(rightHandSide),
      rightHandSide => extendWithValue(
        getValue(rightHandSide),
        rightHandSide => leftHandSide instanceof ES1Reference ? leftHandSide.putValue(rightHandSide) : error('Wrong lefthandside')
      )
    )
  ) : error('Not supported'),
  compileAdditive,
);