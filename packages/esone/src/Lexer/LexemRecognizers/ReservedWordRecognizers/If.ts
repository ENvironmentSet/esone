import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const IfRecognizer: OrdinaryAutomata = stringToAutomata('if');

export class If extends ReservedWord {}

export default [IfRecognizer, If] as [OrdinaryAutomata, typeof If];
