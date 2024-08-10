import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const EqualSignRecognizer: OrdinaryAutomata = stringToAutomata('=');

export class EqualSign extends Operator {}

export const AutomataToEqualSign: [OrdinaryAutomata, typeof EqualSign] = [EqualSignRecognizer, EqualSign];