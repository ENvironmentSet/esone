import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const BreakRecognizer: OrdinaryAutomata = stringToAutomata('break');

export class Break extends ReservedWord {}

export const AutomataToBreak: [OrdinaryAutomata, typeof Break] = [BreakRecognizer, Break];