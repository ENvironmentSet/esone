import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ThisRecognizer: OrdinaryAutomata = stringToAutomata('this');

export class This extends ReservedWord {}

export default [ThisRecognizer, This] as [OrdinaryAutomata, typeof This];
