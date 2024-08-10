import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const GreaterThanRecognizer: OrdinaryAutomata = stringToAutomata('>=');

export class GreaterThan extends Operator {}

export const AutomataToGreaterThan: [OrdinaryAutomata, typeof GreaterThan] = [GreaterThanRecognizer, GreaterThan];