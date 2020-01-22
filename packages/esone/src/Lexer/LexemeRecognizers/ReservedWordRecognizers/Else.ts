import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ElseRecognizer: OrdinaryAutomata = stringToAutomata('else');

export class Else extends ReservedWord {}

export const AutomataToElse: [OrdinaryAutomata, typeof Else] = [ElseRecognizer, Else];