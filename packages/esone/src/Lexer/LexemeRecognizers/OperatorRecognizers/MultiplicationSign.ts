import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const MultiplicationSignRecognizer: OrdinaryAutomata = stringToAutomata('*');

export class MultiplicationSign extends Operator {}

export const AutomataToMultiplicationSign: [OrdinaryAutomata, typeof MultiplicationSign] =
  [MultiplicationSignRecognizer, MultiplicationSign];