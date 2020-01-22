import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LeftParenthesisRecognizer: OrdinaryAutomata = stringToAutomata('(');

export class LeftParenthesis extends Operator {}

export const AutomataToLeftParenthesis: [OrdinaryAutomata, typeof LeftParenthesis] =
  [LeftParenthesisRecognizer, LeftParenthesis];