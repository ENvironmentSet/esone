import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ElseRecognizer: OrdinaryAutomata = stringToAutomata('else');

export class Else extends ReservedWord {}

export default [ElseRecognizer, Else] as [OrdinaryAutomata, typeof Else];
