import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const GreaterThanRecognizer: OrdinaryAutomata = stringToAutomata('>=');

export class GreaterThan extends Operator {}

export default [GreaterThanRecognizer, GreaterThan] as [OrdinaryAutomata, typeof GreaterThan];
