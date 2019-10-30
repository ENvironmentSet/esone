import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const DecrementRecognizer: OrdinaryAutomata = stringToAutomata('--');

export class Decrement extends Operator {}

export default [DecrementRecognizer, Decrement] as [OrdinaryAutomata, typeof Decrement];
