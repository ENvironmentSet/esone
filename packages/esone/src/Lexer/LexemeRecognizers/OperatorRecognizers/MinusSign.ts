import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const MinusSignRecognizer: OrdinaryAutomata = stringToAutomata('-');

export class MinusSign extends Operator {}

export default [MinusSignRecognizer, MinusSign] as [OrdinaryAutomata, typeof MinusSign];
