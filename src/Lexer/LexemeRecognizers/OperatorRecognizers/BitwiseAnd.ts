import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const BitwiseAndRecognizer: OrdinaryAutomata = stringToAutomata('&');

export class BitwiseAnd extends Operator {}

export const AutomataToBitwiseAnd: [OrdinaryAutomata, typeof BitwiseAnd] = [BitwiseAndRecognizer, BitwiseAnd];