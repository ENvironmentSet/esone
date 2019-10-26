import { Predicate } from 'fp-ts/lib/function';
import { Option, some } from 'fp-ts/lib/Option';
import Automata from './Automata';

//@TODO: Optimize by refactoring this to FunctionalIterator
//@TODO: Replace this with Automata Algebra

export class ExoticAutomata extends Automata<ExoticAutomata> {
  public constructor(public predicate: Predicate<string>, public testString: string = '') {
    super();
  }

  public transit({ predicate, testString }: ExoticAutomata, char: string): Option<ExoticAutomata> {
    return some(new ExoticAutomata(predicate, testString + char));
  }

  public isOnFinalState(exoticAutomata: ExoticAutomata): boolean {
    return Automata.run(exoticAutomata, exoticAutomata.testString);
  }

  public run({ predicate }: ExoticAutomata, string: string): boolean {
    return predicate(string);
  }

  public equals(x: ExoticAutomata, y: ExoticAutomata): boolean {
    return x.predicate === y.predicate;
  }
}

export default ExoticAutomata;
