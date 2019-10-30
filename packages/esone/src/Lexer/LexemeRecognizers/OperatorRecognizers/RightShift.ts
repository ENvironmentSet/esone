import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const RightShiftRecognizer: OrdinaryAutomata = stringToAutomata('>>');

export class RightShift extends Operator {}

export default [RightShiftRecognizer, RightShift] as [OrdinaryAutomata, typeof RightShift];
