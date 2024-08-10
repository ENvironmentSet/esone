import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const StrictGreaterThanRecognizer: OrdinaryAutomata = stringToAutomata('>');

export class StrictGreaterThan extends Operator {}

export const AutomataToStrictGreaterThan: [OrdinaryAutomata, typeof StrictGreaterThan] =
  [StrictGreaterThanRecognizer, StrictGreaterThan];