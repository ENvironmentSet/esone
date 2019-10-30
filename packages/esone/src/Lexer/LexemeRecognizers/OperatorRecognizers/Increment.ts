import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const IncrementRecognizer: OrdinaryAutomata = stringToAutomata('++');

export class Increment extends Operator {}

export default [IncrementRecognizer, Increment] as [OrdinaryAutomata, typeof Increment];
