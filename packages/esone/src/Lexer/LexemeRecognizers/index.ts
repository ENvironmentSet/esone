import { anyAutomata, AnyAutomata } from '../Automata';
import { LineTerminatorRecognizer } from './LineTerminator';
import { IdentifierRecognizer } from './Identifier';
import { SemicolonRecognizer } from './Semicolon';
import { ConditionalOperatorHeadRecognizer } from './ConditionalOperatorHead';
import { ConditionalOperatorBodyRecognizer } from './ConditionalOperatorBody';
import {
  ContinueRecognizer, ElseRecognizer, FnRecognizer, ForRecognizer,
  FutureReservedWordRecognizer, InRecognizer, ReturnRecognizer, ThisRecognizer,
  WhileRecognizer, WithRecognizer, VarRecognizer, IfRecognizer, BreakRecognizer
} from './ReservedWordRecognizers';
import {
  AbstractEqualityRecognizer, AssignAfterOperationRecognizer, BitwiseAndRecognizer, BitwiseNotRecognizer,
  BitwiseOrRecognizer, BitwiseXorRecognizer, CommaRecognizer, DecrementRecognizer,
  DeleteRecognizer, DivisionSignRecognizer, EqualSignRecognizer, GreaterThanRecognizer,
  IncrementRecognizer, InequalityRecognizer, LeftBraceRecognizer, LeftBracketRecognizer,
  LeftParenthesisRecognizer, LeftShiftRecognizer, LessThanRecognizer, LogicalAndRecognizer,
  LogicalNotRecognizer, LogicalOrRecognizer, MinusSignRecognizer, MultiplicationSignRecognizer,
  NewRecognizer, PlusSignRecognizer, PropertyAccessRecognizer, RemainderRecognizer,
  RightBraceRecognizer, RightBracketRecognizer, RightParenthesisRecognizer, RightShiftRecognizer,
  StrictGreaterThanRecognizer, StrictLessThanRecognizer, TypeofRecognizer, UnsignedRightShiftRecognizer,
  VoidRecognizer
} from './OperatorRecognizers';
import {
  BoolRecognizer,
  NullRecognizer,
  NumericLiteralRecognizer,
  StringLiteralRecognizer
} from './LiteralRecognizers';

export * from './Token';
export * from './TokenConstructorTable';
export * from './Identifier';
export * from './LineTerminator';
export * from './Semicolon';
export * from './LiteralRecognizers';
export * from './OperatorRecognizers';
export * from './ReservedWordRecognizers';
export * from './ConditionalOperatorHead';
export * from './ConditionalOperatorBody';

export const StringRecognizers: AnyAutomata[] = [
  LineTerminatorRecognizer,
  IdentifierRecognizer,
  SemicolonRecognizer,
  ConditionalOperatorHeadRecognizer,
  ConditionalOperatorBodyRecognizer,
  ContinueRecognizer,
  ElseRecognizer,
  FnRecognizer,
  ForRecognizer,
  FutureReservedWordRecognizer,
  InRecognizer,
  ReturnRecognizer,
  ThisRecognizer,
  WhileRecognizer,
  WithRecognizer,
  VarRecognizer,
  IfRecognizer,
  BreakRecognizer,
  AbstractEqualityRecognizer,
  AssignAfterOperationRecognizer,
  BitwiseAndRecognizer,
  BitwiseNotRecognizer,
  BitwiseOrRecognizer,
  BitwiseXorRecognizer,
  CommaRecognizer,
  DecrementRecognizer,
  DeleteRecognizer,
  DivisionSignRecognizer,
  EqualSignRecognizer,
  GreaterThanRecognizer,
  IncrementRecognizer,
  InequalityRecognizer,
  LeftBraceRecognizer,
  LeftBracketRecognizer,
  LeftParenthesisRecognizer,
  LeftShiftRecognizer,
  LessThanRecognizer,
  LogicalAndRecognizer,
  LogicalNotRecognizer,
  LogicalOrRecognizer,
  MinusSignRecognizer,
  MultiplicationSignRecognizer,
  NewRecognizer,
  PlusSignRecognizer,
  PropertyAccessRecognizer,
  RemainderRecognizer,
  RightBraceRecognizer,
  RightBracketRecognizer,
  RightParenthesisRecognizer,
  RightShiftRecognizer,
  StrictGreaterThanRecognizer,
  StrictLessThanRecognizer,
  TypeofRecognizer,
  UnsignedRightShiftRecognizer,
  VoidRecognizer,
  BoolRecognizer,
  NullRecognizer,
  NumericLiteralRecognizer,
  StringLiteralRecognizer
].map(anyAutomata);