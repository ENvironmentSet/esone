import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const CommaRecognizer: OrdinaryAutomata = stringToAutomata(',');

export class Comma extends Operator {}

export const AutomataToComma: [OrdinaryAutomata, typeof Comma]= [CommaRecognizer, Comma];