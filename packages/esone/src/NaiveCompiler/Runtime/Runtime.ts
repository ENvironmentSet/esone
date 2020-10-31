import { URI as optionURI, option} from 'fp-ts/lib/Option';
import { getStateM, StateM1, StateT1 } from 'fp-ts/lib/StateT';
import { ES1Value } from '../Type/ES1Value';
import { Context } from './Context';

export type Completion = ValueCompletion | ReturnCompletion | BreakCompletion | ContinueCompletion;

export class ValueCompletion<V extends ES1Value = ES1Value> {
  public type: 'ValueCompletion' = 'ValueCompletion';

  public constructor(public value: V) {}
}

export class ReturnCompletion<V extends ES1Value = ES1Value> {
  public type: 'ReturnCompletion' = 'ReturnCompletion';

  public constructor(public value: V) {}
}

export class BreakCompletion {
  public type: 'BreakCompletion' = 'BreakCompletion';
}

export class ContinueCompletion {
  public type: 'ContinueCompletion' = 'ContinueCompletion';
}

export type Runtime<C extends Completion = Completion> = StateT1<optionURI, C, Context>;
// Program is automatically computable function (via algorithm), It calculates something.
// However, Sometimes, It's semantic depends on rather than input factors and it's result gives some effect to other programs.
// So, I separate program result and environment
// Environment, which determines semantic of program (our (abstracted) programs basically doesn't require factor to evaluate, only ES program does.)(and implicit things in code)
// Completion, which doesn't determines semantic of program(only used for synthesising semantic)(explicit in code)(implicit in semantic)

export const runtime: StateM1<optionURI> = getStateM(option);
