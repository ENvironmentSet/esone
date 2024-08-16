export abstract class PhantomTypeParameter<Identifier extends keyof never, InstantiatedType> {
  protected readonly abstract _: {
    readonly [NameP in Identifier]: (_: InstantiatedType) => InstantiatedType;
  };
}