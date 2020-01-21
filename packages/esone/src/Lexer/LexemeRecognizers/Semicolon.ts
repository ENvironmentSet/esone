import { OrdinaryAutomata, stringToAutomata, anyAutomata, AnyAutomata } from '../Automata';
import Token from './Token';

export const SemicolonRecognizer: OrdinaryAutomata = stringToAutomata(';');

export class Semicolon extends Token {}

export default [anyAutomata(SemicolonRecognizer), Semicolon] as [AnyAutomata, typeof Semicolon];
