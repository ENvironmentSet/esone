import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const StrictLessThanRecognizer: OrdinaryAutomata = stringToAutomata('<');

export class StrictLessThan extends Operator {}

export const AutomataToStrictLessThan: [OrdinaryAutomata, typeof StrictLessThan] =
  [StrictLessThanRecognizer, StrictLessThan];