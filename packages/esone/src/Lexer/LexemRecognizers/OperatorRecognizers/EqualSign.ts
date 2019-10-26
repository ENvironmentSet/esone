import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const EqualSignRecognizer: OrdinaryAutomata = stringToAutomata('=');

export class EqualSign extends Operator {}

export default [EqualSignRecognizer, EqualSign] as [OrdinaryAutomata, typeof EqualSign];
