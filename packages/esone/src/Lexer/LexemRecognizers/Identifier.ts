import Automata, {
  ExoticAutomata, OrdinaryAutomata, FinalState,
  State, digit, alphabet, or, transitionPredicate, oneOf, Transition, AnyAutomata
} from '../Automata';
import Token from './Token';
import {
  ContinueRecognizer, ElseRecognizer, FnRecognizer, ForRecognizer,
  FutureReservedWordRecognizer, InRecognizer, ReturnRecognizer, ThisRecognizer,
  WhileRecognizer, WithRecognizer, BreakRecognizer, VarRecognizer, IfRecognizer
} from './ReservedWordRecognizers';
import {
  NullRecognizer, BooleanRecognizer
} from './LiteralRecognizers';
import {
  TypeofRecognizer, NewRecognizer, DeleteRecognizer, VoidRecognizer
} from './OperatorRecognizers';
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
  BooleanRecognizer,
  VarRecognizer,
  IfRecognizer,
  TypeofRecognizer,
  NewRecognizer,
  DeleteRecognizer,
  VoidRecognizer
];

export const IdentifierRecognizer: ExoticAutomata = new ExoticAutomata(string => {
  return Automata.run(IdentifierNameRecognizer, string) &&
    !reservedWordRecognizers.some(recognizer => Automata.run(recognizer, string));
});

export class Identifier extends Token {}

export default [IdentifierRecognizer, Identifier] as [ExoticAutomata, typeof Identifier];
