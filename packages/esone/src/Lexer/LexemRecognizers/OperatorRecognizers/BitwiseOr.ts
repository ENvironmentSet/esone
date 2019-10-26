import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const BitwiseOrRecognizer: OrdinaryAutomata = stringToAutomata('|');

export class BitwiseOr extends Operator {}

export default [BitwiseOrRecognizer, BitwiseOr] as [OrdinaryAutomata, typeof BitwiseOr];
