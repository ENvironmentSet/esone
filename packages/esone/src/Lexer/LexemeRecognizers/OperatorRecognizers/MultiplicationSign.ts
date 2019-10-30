import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const MultiplicationSignRecognizer: OrdinaryAutomata = stringToAutomata('*');

export class MultiplicationSign extends Operator {}

export default [MultiplicationSignRecognizer, MultiplicationSign] as [OrdinaryAutomata, typeof MultiplicationSign];
