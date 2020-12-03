import { isNone, none, Option, some } from 'fp-ts/Option';
import { ValueIdentifier } from '../Runtime/Context';
import { ES1Object } from './ES1Object';

export abstract class ES1Value {
  protected constructor(
    protected representation: unknown,
    protected identifier: Option<ValueIdentifier> = none
  ) {}

  get isIntroduced(): boolean {
    return !isNone(this.identifier);
  }

  use(identifier: ValueIdentifier): this {
    return Object.create(this, {identifier: {value: some(identifier)}});
  }

  abstract wrap(): Option<ES1Object>;

  //abstract toString(): string; //@TODO: Use ES1String Instead
}
