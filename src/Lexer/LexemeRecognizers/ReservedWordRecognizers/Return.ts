import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ReturnRecognizer: OrdinaryAutomata = stringToAutomata('return');

export class Return extends ReservedWord {}

export const AutomataToReturn: [OrdinaryAutomata, typeof Return] = [ReturnRecognizer, Return];