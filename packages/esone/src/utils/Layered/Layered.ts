export class Layered {
  next(update: (self: this) => void): this {
    const isolated = Object.create(this);

    update(isolated);

    return Object.assign(isolated, update);
  }
}