import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Operator } from '../Token';

export const DivisionSignRecognizer: OrdinaryAutomata = stringToAutomata('/');

export class DivisionSign extends Operator {}

export default [DivisionSignRecognizer, DivisionSign] as [OrdinaryAutomata, typeof DivisionSign];
