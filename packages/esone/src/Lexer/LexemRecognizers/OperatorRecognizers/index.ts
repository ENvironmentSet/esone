import AutomataToAbstractEquality from './AbstractEquality';
import AutomataToAssignAfterOperation from './AssignAfterOperation';
import AutomataToBitwiseAnd from './BitwiseAnd';
import AutomataToBitwiseNot from './BitwiseNot';
import AutomataToBitwiseOr from './BitwiseOr';
import AutomataToBitwiseXor from './BitwiseXor';
import AutomataToComma from './Comma';
import AutomataToDecrement from './Decrement';
import AutomataToDelete from './Delete';
import AutomataToDivisionSign from './DivisionSign';
import AutomataToEqualSign from './EqualSign';
import AutomataToGreaterThan from './GreaterThan';
import AutomataToIncrement from './Increment';
import AutomataToInequality from './Inequality';
import AutomataToLeftBrace from './LeftBrace';
import AutomataToLeftBracket from './LeftBracket';
import AutomataToLeftParenthesis from './LeftParenthesis';
import AutomataToLeftShift from './LeftShift';
import AutomataToLessThan from './LessThan';
import AutomataToLogicalAnd from './LogicalAnd';
import AutomataToLogicalNot from './LogicalNot';
import AutomataToLogicalOr from './LogicalOr';
import AutomataToMinusSign from './MinusSign';
import AutomataToMultiplicationSign from './MultiplicationSign';
import AutomataToNew from './New';
import AutomataToPlusSign from './PlusSign';
import AutomataToPropertyAccess from './PropertyAccess';
import AutomataToRemainder from './Remainder';
import AutomataToRightBrace from './RightBrace';
import AutomataToRightBracket from './RightBracket';
import AutomataToRightParenthesis from './RightParenthesis';
import AutomataToRightShift from './RightShift';
import AutomataToStrictGreaterThan from './StrictGreaterThan';
import AutomataToStrictLessThan from './StrictLessThan';
import AutomataToTypeof from './Typeof';
import AutomataToUnsignedRightShift from './UnsignedRightShift';
import AutomataToVoid from './Void';


import { AnyAutomata } from '../../Automata';
import { Operator } from '../Token';

export * from './AbstractEquality';
export * from './AssignAfterOperation';
export * from './BitwiseAnd';
export * from './BitwiseNot';
export * from './BitwiseOr';
export * from './BitwiseXor';
export * from './Comma';
export * from './Decrement';
export * from './Delete';
export * from './DivisionSign';
export * from './EqualSign';
export * from './GreaterThan';
export * from './Increment';
export * from './Inequality';
export * from './LeftBrace';
export * from './LeftBracket';
export * from './LeftParenthesis';
export * from './LeftShift';
export * from './LessThan';
export * from './LogicalAnd';
export * from './LogicalNot';
export * from './LogicalOr';
export * from './MinusSign';
export * from './MultiplicationSign';
export * from './New';
export * from './PlusSign';
export * from './PropertyAccess';
export * from './Remainder';
export * from './RightBrace';
export * from './RightBracket';
export * from './RightParenthesis';
export * from './RightShift';
export * from './StrictGreaterThan';
export * from './StrictLessThan';
export * from './Typeof';
export * from './UnsignedRightShift';
export * from './Void';

export default [
  AutomataToAbstractEquality,
  AutomataToAssignAfterOperation,
  AutomataToBitwiseAnd,
  AutomataToBitwiseNot,
  AutomataToBitwiseOr,
  AutomataToBitwiseXor,
  AutomataToComma,
  AutomataToDecrement,
  AutomataToDelete,
  AutomataToDivisionSign,
  AutomataToEqualSign,
  AutomataToGreaterThan,
  AutomataToIncrement,
  AutomataToInequality,
  AutomataToLeftBrace,
  AutomataToLeftBracket,
  AutomataToLeftParenthesis,
  AutomataToLeftShift,
  AutomataToLessThan,
  AutomataToLogicalAnd,
  AutomataToLogicalNot,
  AutomataToLogicalOr,
  AutomataToMinusSign,
  AutomataToMultiplicationSign,
  AutomataToNew,
  AutomataToPlusSign,
  AutomataToPropertyAccess,
  AutomataToRemainder,
  AutomataToRightBrace,
  AutomataToRightBracket,
  AutomataToRightParenthesis,
  AutomataToRightShift,
  AutomataToStrictGreaterThan,
  AutomataToStrictLessThan,
  AutomataToTypeof,
  AutomataToUnsignedRightShift,
  AutomataToVoid
] as [AnyAutomata, typeof Operator][];
