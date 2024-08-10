import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const MinusSignRecognizer: OrdinaryAutomata = stringToAutomata('-');

export class MinusSign extends Operator {}

export const AutomataToMinusSign: [OrdinaryAutomata, typeof MinusSign] = [MinusSignRecognizer, MinusSign];