import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const DecrementRecognizer: OrdinaryAutomata = stringToAutomata('--');

export class Decrement extends Operator {}

export const AutomataToDecrement: [OrdinaryAutomata, typeof Decrement] = [DecrementRecognizer, Decrement];