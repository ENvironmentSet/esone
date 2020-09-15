export abstract class ES1Type<Representation> {
  [valueConstructor: string]: ((...args: never) => Representation) | undefined
}
