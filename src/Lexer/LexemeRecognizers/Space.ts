import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import { Token } from './Token';

export const SpaceRecognizer: OrdinaryAutomata = stringToAutomata(' ');

export class Space extends Token {}

export const AutomataToSpace: [AnyAutomata, typeof Space] =
  [anyAutomata(SpaceRecognizer), Space];