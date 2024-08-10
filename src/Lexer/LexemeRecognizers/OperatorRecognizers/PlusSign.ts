import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const PlusSignRecognizer: OrdinaryAutomata = stringToAutomata('+');

export class PlusSign extends Operator {}

export const AutomataToPlusSign: [OrdinaryAutomata, typeof PlusSign] = [PlusSignRecognizer, PlusSign];