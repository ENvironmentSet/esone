import { Immutable } from '../../utils/Immutable/Immutable';
import { chain, isSome, none, Option, some, map, getFirstMonoid, flatten } from 'fp-ts/Option';
import { ES1Value } from '../Type/ES1Value';
import { MarkAsOpaqueType } from '../../utils/Type/MarkAsOpaqueType';
import { lookup, insertAt, member } from 'fp-ts/Map';
import { eqNumber, eqString } from 'fp-ts/Eq';
import { ES1Object } from '../Type/ES1Object';
import { Runtime } from './Runtime';
import { right } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

export type BindingId = string;

export type ScopeId = MarkAsOpaqueType<number, 'ScopeId'>;

const { concat } = getFirstMonoid<ES1Value>();

export class Scope extends Immutable {
  constructor(
    public outerScope: Option<ScopeId> = none,
    public bindings: Map<BindingId, ES1Value> = new Map
  ) { super(); }

  private withOuterScope<A>(f: (outer: Scope) => A, context: Context): Option<A> {
    return chain((outerScopeId: ScopeId) => map(f)(context.getScope(outerScopeId)))(this.outerScope);
  }

  public ref(name: BindingId, context: Context): Option<ES1Value> {
    return concat(lookup(eqString)(name, this.bindings), flatten(this.withOuterScope(scope => scope.ref(name, context), context)));
  }

  public has(name: BindingId, context: Context): boolean {
    return isSome(this.ref(name, context));
  }

  public hasOwn(name: BindingId): boolean {
    return member(eqString)(name, this.bindings);
  }

  public bind(value: ES1Value, name: BindingId, context: Context): Option<Scope> {
    return this.has(name, context) ? none : some(this.update({ bindings: insertAt(eqString)(name, value)(this.bindings) }));
  }

  public set(value: ES1Value, name: BindingId, context: Context): Option<Scope> {
    return this.hasOwn(name) ? some(this.update({ bindings: insertAt(eqString)(name, value)(this.bindings) })) : flatten(this.withOuterScope(scope => scope.set(value, name, context), context));
  }
}

export type ObjectId = MarkAsOpaqueType<number, 'ObjectId'>;

export class Context extends Immutable { // need Monad Instance
  protected constructor(
    private scopes: Map<ScopeId, Scope>,
    private scopeIdGenerationBoundary: ScopeId,
    private currentlyReferencedScope: ScopeId,
    private objectIdGenerationBoundary: ObjectId = 0 as ObjectId,
  ) { super(); }

  static createContext(globalScope: Scope = new Scope): Context {
    return new Context(new Map([[0 as ScopeId, globalScope]]), 1 as ScopeId, 0 as ScopeId);
  }

  public createScope(outerScope: Option<ScopeId>): [ScopeId, Context, ScopeId] {
    const newScope = new Scope(outerScope);
    const newScopeId = this.scopeIdGenerationBoundary as ScopeId;
    const newScopeMap = insertAt(eqNumber)(newScopeId, newScope)(this.scopes) as Map<ScopeId, Scope>;
    const previousScope = this.currentlyReferencedScope;

    return [newScopeId, this.update({ scopes: newScopeMap, scopeIdGenerationBoundary: newScopeId + 1, currentlyReferencedScope: newScopeId }), previousScope];
  }

  public introduceObject(object: ES1Object): ReturnType<Runtime<ES1Object>> {
    return cont => cont(right([some(object.setId(this.objectIdGenerationBoundary)), this.update({ objectIdGenerationBoundary: this.objectIdGenerationBoundary + 1 })]));
  }

  public bind(value: ES1Value, name: BindingId): Option<Context> {
    return this.modifyScope(this.currentlyReferencedScope, scope => scope.bind(value, name, this));
  }

  public getScope(id: ScopeId): Option<Scope> {
    return lookup(eqNumber)(id, this.scopes);
  }

  public modifyScope(id: ScopeId, f: (scope: Scope) => Option<Scope>): Option<Context> {
    return pipe(
      this.getScope(id),
      chain(f),
      map(scope => insertAt(eqNumber)(id, scope)(this.scopes) as Map<ScopeId, Scope>),
      map(scopes => this.update({ scopes })),
    )
  }

  public get(name: BindingId): Option<ES1Value> {
    return pipe(
      this.getScope(this.currentlyReferencedScope),
      chain(scope => scope.ref(name, this))
    );
  }

  public resolveScope(scopeId: ScopeId, name: BindingId): Option<ScopeId> {
    return pipe(
      this.getScope(scopeId),
      chain(scope => scope.hasOwn(name) ? some(scopeId) : chain((scopeId: ScopeId) => this.resolveScope(scopeId, name))(scope.outerScope))
    )
  }

  public set(value: ES1Value, name: BindingId): Option<Context> {
    return pipe(
      this.resolveScope(this.currentlyReferencedScope, name),
      chain(scopeId => this.modifyScope(scopeId, scope => scope.set(value, name, this)))
    )
  }

  public get currentScope(): ScopeId {
    return this.currentlyReferencedScope;
  }
}