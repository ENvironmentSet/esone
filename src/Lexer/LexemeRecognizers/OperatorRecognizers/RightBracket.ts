import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const RightBracketRecognizer: OrdinaryAutomata = stringToAutomata(']');

export class RightBracket extends Operator {}

export const AutomataToRightBracket: [OrdinaryAutomata, typeof RightBracket] =
  [RightBracketRecognizer, RightBracket];