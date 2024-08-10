import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const VoidRecognizer: OrdinaryAutomata = stringToAutomata('void');

export class Void extends Operator {}

export const AutomataToVoid: [OrdinaryAutomata, typeof Void] = [VoidRecognizer, Void];