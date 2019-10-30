import { OrdinaryAutomata, stringToAutomata } from '../Automata';
import Token from './Token';

export const SemicolonRecognizer: OrdinaryAutomata = stringToAutomata(';');

export class Semicolon extends Token {}

export default [SemicolonRecognizer, Semicolon] as [OrdinaryAutomata, typeof Semicolon];
