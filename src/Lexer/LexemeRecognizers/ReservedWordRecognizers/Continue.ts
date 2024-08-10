import { OrdinaryAutomata, stringToAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

export const ContinueRecognizer: OrdinaryAutomata = stringToAutomata('continue');

export class Continue extends ReservedWord {}

export const AutomataToContinue: [OrdinaryAutomata, typeof Continue] = [ContinueRecognizer, Continue];