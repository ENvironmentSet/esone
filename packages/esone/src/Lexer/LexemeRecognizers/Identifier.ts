import {
  ExoticAutomata, OrdinaryAutomata, FinalState, Automata,
  State, digit, alphabet, or, transitionPredicate, oneOf, Transition,
  AnyAutomata, anyAutomata
} from '../Automata';
import { Token } from './Token';
import {
  ContinueRecognizer, ElseRecognizer, FnRecognizer, ForRecognizer,
  FutureReservedWordRecognizer, InRecognizer, ReturnRecognizer, ThisRecognizer,
  WhileRecognizer, WithRecognizer, BreakRecognizer, VarRecognizer, IfRecognizer
} from './ReservedWordRecognizers';
import {
  NullRecognizer, BoolRecognizer
} from './LiteralRecognizers';
import {
  TypeofRecognizer, NewRecognizer, DeleteRecognizer, VoidRecognizer
} from './OperatorRecognizers';
import { not } from 'fp-ts/lib/function';
//@TODO: How to organize well Null/Boolean, Typeof and it's friends?

const startS: State = new State('start');
const identifierBodyS: FinalState = new FinalState('identifierBody');
const identifierHeadP: transitionPredicate = or(alphabet, oneOf('_', '$'));
const identifierBodyP: transitionPredicate = or(identifierHeadP, digit);
const IdentifierNameRecognizer: OrdinaryAutomata = new OrdinaryAutomata(startS, [
  new Transition(identifierHeadP, startS, identifierBodyS),
  new Transition(identifierBodyP, identifierBodyS, identifierBodyS),
]);

const reservedWordRecognizers: AnyAutomata[] = [
  ContinueRecognizer,
  ElseRecognizer,
  FnRecognizer,
  BreakRecognizer,
  ForRecognizer,
  FutureReservedWordRecognizer,
  InRecognizer,
  ReturnRecognizer,
  ThisRecognizer,
  WhileRecognizer,
  WithRecognizer,
  NullRecognizer,
  BoolRecognizer,
  VarRecognizer,
  IfRecognizer,
  TypeofRecognizer,
  NewRecognizer,
  DeleteRecognizer,
  VoidRecognizer
].map(anyAutomata);

export const IdentifierRecognizer: ExoticAutomata = new ExoticAutomata(string => {
  return Automata.run(IdentifierNameRecognizer, string) &&
    reservedWordRecognizers.every(not(recognizer => recognizer(automata => Automata.run(automata, string))));
});

export class Identifier extends Token {}

export const AutomataToIdentifier: [AnyAutomata, typeof Identifier] =
  [anyAutomata(IdentifierRecognizer), Identifier];