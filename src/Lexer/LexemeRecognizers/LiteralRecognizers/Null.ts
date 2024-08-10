import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { Literal } from '../Token';

export const NullRecognizer: OrdinaryAutomata = stringToAutomata('null');

export class Null extends Literal {}

export const AutomataToNull: [OrdinaryAutomata, typeof Null] = [NullRecognizer, Null];