import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const InequalityRecognizer: OrdinaryAutomata = stringToAutomata('!=');

export class Inequality extends Operator {}

export default [InequalityRecognizer, Inequality] as [OrdinaryAutomata, typeof Inequality];
