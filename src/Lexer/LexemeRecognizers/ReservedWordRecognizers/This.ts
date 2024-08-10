import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ThisRecognizer: OrdinaryAutomata = stringToAutomata('this');

export class This extends ReservedWord {}

export const AutomataToThis: [OrdinaryAutomata, typeof This] = [ThisRecognizer, This];