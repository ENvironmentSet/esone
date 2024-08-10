import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const WhileRecognizer: OrdinaryAutomata = stringToAutomata('while');

export class While extends ReservedWord {}

export const AutomataToWhile: [OrdinaryAutomata, typeof While] = [WhileRecognizer, While];