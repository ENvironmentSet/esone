import { ES1ObjectRepresentation } from '../Type/ES1Object';
import { insertAt } from 'fp-ts/Map';
import { Lens } from 'monocle-ts';
import { flow } from 'fp-ts/function';
import { eqNumber } from 'fp-ts/Eq';
import { chain } from '../../utils/Func';

export type ES1ObjectReference = number;

export class Environment {
  constructor(
    public objectPool: Map<ES1ObjectReference, ES1ObjectRepresentation> = new Map(), //@TODO: Replace with WeakMap
    public objectIdentifierBoundary: ES1ObjectReference = objectPool.size,
  ) {}

  static createObject(objectDescriptor: ES1ObjectRepresentation): (environment: Environment) => [ES1ObjectReference, Environment] {
    const objectPool = Lens.fromProp<Environment>()('objectPool');
    const { get: getObjectIdentifierBoundary, set: setObjectIdentifierBoundary } = Lens.fromProp<Environment>()('objectIdentifierBoundary');

    return chain( //@TODO Refactor with fp-ts-contrib's Do
      getObjectIdentifierBoundary,
      objectIdentifierBoundary => flow(
        objectPool.modify(insertAt(eqNumber)(objectIdentifierBoundary, objectDescriptor)),
        setObjectIdentifierBoundary(objectIdentifierBoundary + 1),
        environment => [objectIdentifierBoundary, environment]
      )
    );
  }
}
