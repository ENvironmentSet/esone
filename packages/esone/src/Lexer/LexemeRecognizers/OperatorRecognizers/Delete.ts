import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const DeleteRecognizer: OrdinaryAutomata = stringToAutomata('delete');

export class Delete extends Operator {}

export default [DeleteRecognizer, Delete] as [OrdinaryAutomata, typeof Delete];
