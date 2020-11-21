import { Option, some, chain } from 'fp-ts/Option';

export const previous = Symbol('Layered/previous');

export class Layered {
  readonly [previous]: Option<this>;

  next(update: (self: this) => void): this { //@FIXME: Better ways?
    const isolated = Object.create(this);

    update(isolated);

    return Object.assign(isolated, { [previous]: some(this) });
  }

  slice(ordinal: number): Option<this> {
    if (ordinal === 0) return some(this);
    else return chain((previous: this) => previous.slice(ordinal - 1))(this[previous]);
  }
}