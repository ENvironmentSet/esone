export class Immutable {
  //@FIXME: Since typescript implements variance incorrectly, other type-safe ways are as unsafe as this.
  update(update: unknown): this {
    const isolated = Object.create(this);

    return Object.assign(isolated, update);
  }
}