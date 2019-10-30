import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const UnsignedRightShiftRecognizer: OrdinaryAutomata = stringToAutomata('>>>');

export class UnsignedRightShift extends Operator {}

export default [UnsignedRightShiftRecognizer, UnsignedRightShift] as [OrdinaryAutomata, typeof UnsignedRightShift];
