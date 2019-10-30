import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const BitwiseNotRecognizer: OrdinaryAutomata = stringToAutomata('~');

export class BitwiseNot extends Operator {}

export default [BitwiseNotRecognizer, BitwiseNot] as [OrdinaryAutomata, typeof BitwiseNot];
