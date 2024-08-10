import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const DivisionSignRecognizer: OrdinaryAutomata = stringToAutomata('/');

export class DivisionSign extends Operator {}

export const AutomataToDivisionSign: [OrdinaryAutomata, typeof DivisionSign] =
  [DivisionSignRecognizer, DivisionSign];