import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const DeleteRecognizer: OrdinaryAutomata = stringToAutomata('delete');

export class Delete extends Operator {}

export const AutomataToDelete: [OrdinaryAutomata, typeof Delete] = [DeleteRecognizer, Delete];