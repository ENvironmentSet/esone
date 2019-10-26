import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LessThanRecognizer: OrdinaryAutomata = stringToAutomata('<=');

export class LessThan extends Operator {}

export default [LessThanRecognizer, LessThan] as [OrdinaryAutomata, typeof LessThan];
