import {
  OrdinaryAutomata, FinalState, State, Transition, transitionPredicate,
  equals, any, and, not, oneOf
} from '../../Automata';
import { Literal } from '../Token';
//@TODO: Add support for SingleQuoteString

const startS: State = new State('start');
const doubleQuoteStartS: State = new State('doubleQuoteStart');
const escapeS: State = new State('escape');
const doubleQuoteEndS: FinalState = new FinalState('doubleQuoteEnd');
const charP: transitionPredicate = and(any, not(oneOf('\n', '"', '\\')));
const doubleQuoteP: transitionPredicate = equals('"');
const escapeP: transitionPredicate = equals('\\');
const escapedP: transitionPredicate = any; // TODO: detail escape sequence

export const StringLiteralRecognizer: OrdinaryAutomata = new OrdinaryAutomata(startS, [
  new Transition(doubleQuoteP, startS, doubleQuoteStartS),
  new Transition(escapeP, doubleQuoteStartS, escapeS),
  new Transition(escapedP, escapeS, doubleQuoteStartS),
  new Transition(charP, doubleQuoteStartS, doubleQuoteStartS),
  new Transition(doubleQuoteP, doubleQuoteStartS, doubleQuoteEndS),
]);

export class StringLiteral extends Literal {}

export const AutomataToStringLiteral: [OrdinaryAutomata, typeof StringLiteral] =
  [StringLiteralRecognizer, StringLiteral];