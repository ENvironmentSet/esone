import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import { Token } from './Token';

export const SemicolonRecognizer: OrdinaryAutomata = stringToAutomata(';');

export class Semicolon extends Token {}

export const AutomataToSemicolon: [AnyAutomata, typeof Semicolon] =
  [anyAutomata(SemicolonRecognizer), Semicolon];