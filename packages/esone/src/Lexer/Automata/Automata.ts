import { Option } from 'fp-ts/lib/Option';
import { Eq } from 'fp-ts/lib/Eq';

export abstract class Automata<A> implements Eq<A> {
  public abstract transit(automata: A, char: string): Option<A>;
  public abstract isOnFinalState(automata: A): boolean;
  public abstract run(automata: A, string: string): boolean;
  public abstract equals(x: A, y: A): boolean;

  public static transit<A extends Automata<A>>(automata: A, char: string): Option<A> {
    return automata.transit(automata, char);
  }

  public static isOnFinalState<A extends Automata<A>>(automata: A): boolean {
    return automata.isOnFinalState(automata);
  }

  public static run<A extends Automata<A>>(automata: A, string: string): boolean {
    return automata.run(automata, string);
  }

  public static equals<A extends Automata<A>>(instance: A, y: A): boolean {
    return instance.equals(instance, y);
  }
}

export default Automata;
