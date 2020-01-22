import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const BitwiseXorRecognizer: OrdinaryAutomata = stringToAutomata('^');

export class BitwiseXor extends Operator {}

export const AutomataToBitwiseXor: [OrdinaryAutomata, typeof BitwiseXor] = [BitwiseXorRecognizer, BitwiseXor];