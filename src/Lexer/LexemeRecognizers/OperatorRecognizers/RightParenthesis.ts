import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const RightParenthesisRecognizer: OrdinaryAutomata = stringToAutomata(')');

export class RightParenthesis extends Operator {}

export const AutomataToRightParenthesis: [OrdinaryAutomata, typeof RightParenthesis] =
  [RightParenthesisRecognizer, RightParenthesis];