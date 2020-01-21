import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import Token from './Token';

export const LineTerminatorRecognizer: OrdinaryAutomata = stringToAutomata('\n');

export class LineTerminator extends Token {}

export default [anyAutomata(LineTerminatorRecognizer), LineTerminator] as [AnyAutomata, typeof LineTerminator];
