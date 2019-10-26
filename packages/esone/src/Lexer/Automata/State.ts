import { Eq } from 'fp-ts/lib/Eq';

export class State {
  constructor(public indicator: string) {}

  static state: Eq<State> = {
    equals(x: State, y: State): boolean {
      return x.indicator === y.indicator;
    }
  };
}

export default State;