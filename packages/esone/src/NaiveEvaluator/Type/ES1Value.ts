import { isNone, none, Option, some } from 'fp-ts/Option';
import { ValueIdentifier } from '../Runtime/Context';

export type Stage = 'used' | 'unused';

export abstract class ES1Value {
  protected constructor(
    protected representation: unknown,
    protected identifier: Option<ValueIdentifier> = none
  ) {}

  get isIntroduced(): boolean {
    return !isNone(this.identifier);
  }

  use(identifier: ValueIdentifier): this {
    return Object.create(this, { identifier: { value: some(identifier) } });
  }
}
