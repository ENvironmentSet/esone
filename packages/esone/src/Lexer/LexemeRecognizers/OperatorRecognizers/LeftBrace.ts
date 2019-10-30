import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LeftBraceRecognizer: OrdinaryAutomata = stringToAutomata('{');

export class LeftBrace extends Operator {}

export default [LeftBraceRecognizer, LeftBrace] as [OrdinaryAutomata, typeof LeftBrace];
