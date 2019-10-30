import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const TypeofRecognizer: OrdinaryAutomata = stringToAutomata('typeof');

export class Typeof extends Operator {}

export default [TypeofRecognizer, Typeof] as [OrdinaryAutomata, typeof Typeof];
