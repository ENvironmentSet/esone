import { Automata, OrdinaryAutomata, stringToAutomata, ExoticAutomata } from '../../Automata';
import { Literal } from '../Token';

const TrueRecognizer: OrdinaryAutomata = stringToAutomata('true');
const FalseRecognizer: OrdinaryAutomata = stringToAutomata('false');

const boolRecognizers: OrdinaryAutomata[] = [
  TrueRecognizer,
  FalseRecognizer
];

export const BoolRecognizer: ExoticAutomata = new ExoticAutomata(
  string => boolRecognizers.some(recognizer => Automata.run(recognizer, string))
);

export class Bool extends Literal {}

export const AutomataToBool: [ExoticAutomata, typeof Bool] = [BoolRecognizer, Bool];