import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const RightParenthesisRecognizer: OrdinaryAutomata = stringToAutomata(')');

export class RightParenthesis extends Operator {}

export default [RightParenthesisRecognizer, RightParenthesis] as [OrdinaryAutomata, typeof RightParenthesis];
