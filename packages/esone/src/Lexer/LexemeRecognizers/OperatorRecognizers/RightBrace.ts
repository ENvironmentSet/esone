import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const RightBraceRecognizer: OrdinaryAutomata = stringToAutomata('}');

export class RightBrace extends Operator {}

export default [RightBraceRecognizer, RightBrace] as [OrdinaryAutomata, typeof RightBrace];
