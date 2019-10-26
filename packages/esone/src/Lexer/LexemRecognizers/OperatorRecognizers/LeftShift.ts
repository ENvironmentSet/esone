import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const LeftShiftRecognizer: OrdinaryAutomata = stringToAutomata('<<');

export class LeftShift extends Operator {}

export default [LeftShiftRecognizer, LeftShift] as [OrdinaryAutomata, typeof LeftShift];
