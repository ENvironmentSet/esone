import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const InRecognizer: OrdinaryAutomata = stringToAutomata('in');

export class In extends ReservedWord {}

export const AutomataToIn: [OrdinaryAutomata, typeof In] = [InRecognizer, In];