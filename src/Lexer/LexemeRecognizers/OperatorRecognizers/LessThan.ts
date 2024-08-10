import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LessThanRecognizer: OrdinaryAutomata = stringToAutomata('<=');

export class LessThan extends Operator {}

export const AutomataToLessThan: [OrdinaryAutomata, typeof LessThan] = [LessThanRecognizer, LessThan];