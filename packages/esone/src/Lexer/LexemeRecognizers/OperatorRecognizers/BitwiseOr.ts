import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const BitwiseOrRecognizer: OrdinaryAutomata = stringToAutomata('|');

export class BitwiseOr extends Operator {}

export const AutomataToBitwiseOr: [OrdinaryAutomata, typeof BitwiseOr] = [BitwiseOrRecognizer, BitwiseOr];