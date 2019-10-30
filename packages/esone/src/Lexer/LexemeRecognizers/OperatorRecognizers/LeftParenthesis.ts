import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LeftParenthesisRecognizer: OrdinaryAutomata = stringToAutomata('(');

export class LeftParenthesis extends Operator {}

export default [LeftParenthesisRecognizer, LeftParenthesis] as [OrdinaryAutomata, typeof LeftParenthesis];
