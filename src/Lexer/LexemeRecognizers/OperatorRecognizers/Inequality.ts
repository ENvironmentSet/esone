import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const InequalityRecognizer: OrdinaryAutomata = stringToAutomata('!=');

export class Inequality extends Operator {}

export const AutomataToInequality: [OrdinaryAutomata, typeof Inequality] = [InequalityRecognizer, Inequality];