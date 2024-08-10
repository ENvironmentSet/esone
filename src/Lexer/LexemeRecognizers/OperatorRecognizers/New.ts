import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const NewRecognizer: OrdinaryAutomata = stringToAutomata('new');

export class New extends Operator {}

export const AutomataToNew: [OrdinaryAutomata, typeof New] = [NewRecognizer, New];