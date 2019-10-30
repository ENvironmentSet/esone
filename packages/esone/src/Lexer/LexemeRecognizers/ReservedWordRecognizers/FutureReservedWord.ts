import Automata, { OrdinaryAutomata, stringToAutomata, ExoticAutomata } from '../../Automata';
import { ReservedWord } from '../Token';

const CaseRecognizer: OrdinaryAutomata = stringToAutomata('case');
const DebuggerRecognizer: OrdinaryAutomata = stringToAutomata('debugger');
const ExportRecognizer: OrdinaryAutomata = stringToAutomata('export');
const SuperRecognizer: OrdinaryAutomata = stringToAutomata('super');
const CatchRecognizer: OrdinaryAutomata = stringToAutomata('catch');
const DefaultRecognizer: OrdinaryAutomata = stringToAutomata('default');
const ExtendsRecognizer: OrdinaryAutomata = stringToAutomata('extends');
const SwitchRecognizer: OrdinaryAutomata = stringToAutomata('switch');
const ClassRecognizer: OrdinaryAutomata = stringToAutomata('class');
const DoRecognizer: OrdinaryAutomata = stringToAutomata('do');
const FinallyRecognizer: OrdinaryAutomata = stringToAutomata('finally');
const ThrowRecognizer: OrdinaryAutomata = stringToAutomata('throw');
const ConstRecognizer: OrdinaryAutomata = stringToAutomata('const');
const EnumRecognizer: OrdinaryAutomata = stringToAutomata('enum');
const ImportRecognizer: OrdinaryAutomata = stringToAutomata('import');
const TryRecognizer: OrdinaryAutomata = stringToAutomata('try');

const futureReservedWordRecognizers: OrdinaryAutomata[] = [
  CaseRecognizer,
  DebuggerRecognizer,
  ExportRecognizer,
  SuperRecognizer,
  CatchRecognizer,
  DefaultRecognizer,
  ExtendsRecognizer,
  SwitchRecognizer,
  ClassRecognizer,
  DoRecognizer,
  FinallyRecognizer,
  ThrowRecognizer,
  ConstRecognizer,
  EnumRecognizer,
  ImportRecognizer,
  TryRecognizer
];

export const FutureReservedWordRecognizer: ExoticAutomata = new ExoticAutomata(
  string => futureReservedWordRecognizers.some(recognizer => Automata.run(recognizer, string))
);

export class FutureReservedWord extends ReservedWord {}

export default [FutureReservedWordRecognizer, FutureReservedWord] as [ExoticAutomata, typeof FutureReservedWord];
