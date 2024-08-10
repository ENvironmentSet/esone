import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ForRecognizer: OrdinaryAutomata = stringToAutomata('for');

export class For extends ReservedWord {}

export const AutomataToFor: [OrdinaryAutomata, typeof For] = [ForRecognizer, For];