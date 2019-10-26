import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const BitwiseXorRecognizer: OrdinaryAutomata = stringToAutomata('^');

export class BitwiseXor extends Operator {}

export default [BitwiseXorRecognizer, BitwiseXor] as [OrdinaryAutomata, typeof BitwiseXor];
