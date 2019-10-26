import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const StrictGreaterThanRecognizer: OrdinaryAutomata = stringToAutomata('>');

export class StrictGreaterThan extends Operator {}

export default [StrictGreaterThanRecognizer, StrictGreaterThan] as [OrdinaryAutomata, typeof StrictGreaterThan];
