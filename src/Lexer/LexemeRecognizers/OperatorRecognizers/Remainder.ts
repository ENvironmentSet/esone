import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const RemainderRecognizer: OrdinaryAutomata = stringToAutomata('%');

export class Remainder extends Operator {}

export const AutomataToRemainder: [OrdinaryAutomata, typeof Remainder] = [RemainderRecognizer, Remainder];