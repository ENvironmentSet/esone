import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LeftBracketRecognizer: OrdinaryAutomata = stringToAutomata('[');

export class LeftBracket extends Operator {}

export default [LeftBracketRecognizer, LeftBracket] as [OrdinaryAutomata, typeof LeftBracket];
