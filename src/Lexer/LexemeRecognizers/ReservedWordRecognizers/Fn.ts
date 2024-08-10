import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const FnRecognizer: OrdinaryAutomata = stringToAutomata('function');

export class Fn extends ReservedWord {}

export const AutomataToFn: [OrdinaryAutomata, typeof Fn] = [FnRecognizer, Fn];