import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const WithRecognizer: OrdinaryAutomata = stringToAutomata('with');

export class With extends ReservedWord {}

export const AutomataToWith: [OrdinaryAutomata, typeof With] =
  [WithRecognizer, With];