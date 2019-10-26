import {
  OrdinaryAutomata, FinalState, State, Transition, transitionPredicate,
  equals, digit, and, not
} from '../../Automata';
import { Literal } from '../Token';
//@TODO: Add support for HexIntegerLiteral and OctalIntegerLiteral and Exponent

const startS: State = new State('start');
const zeroS: FinalState = new FinalState('zero');
const decimalIntegerLiteralS: FinalState = new FinalState('decimalIntegerLiteral');
const pointS: State = new State('point');
const decimalDigitS: FinalState = new FinalState('decimalDigit');
const zeroP: transitionPredicate = equals('0');
const decimalIntegerLiteralP: transitionPredicate = and(not(zeroP), digit);
const pointP: transitionPredicate = equals('.');
const decimalDigitP: transitionPredicate = digit;

const DecimalLiteralRecognizer: OrdinaryAutomata = new OrdinaryAutomata(startS, [
  new Transition(zeroP, startS, zeroS),
  new Transition(decimalIntegerLiteralP, startS, decimalIntegerLiteralS),
  new Transition(decimalDigitP, decimalIntegerLiteralS, decimalIntegerLiteralS),
  new Transition(pointP, startS, pointS),
  new Transition(pointP, zeroS, pointS),
  new Transition(pointP, decimalIntegerLiteralS, pointS),
  new Transition(decimalDigitP, pointS, decimalDigitS),
  new Transition(decimalDigitP, decimalDigitS, decimalDigitS),
]);

export const NumericLiteralRecognizer: OrdinaryAutomata = DecimalLiteralRecognizer;

export class NumericLiteral extends Literal {}

export default [NumericLiteralRecognizer, NumericLiteral] as [OrdinaryAutomata, typeof NumericLiteral];
