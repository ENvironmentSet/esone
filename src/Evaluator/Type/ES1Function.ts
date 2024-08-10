import { Block } from '../../Parser/AST/Statement';
import { ScopeId, BindingId } from '../Runtime/Context';
import { ES1Object, ES1ObjectRepresentation, ES1PropertyRepresentation } from './ES1Object';
import { ES1String } from './ES1String';
import { ES1Null } from './ES1Null';
import { none, some } from 'fp-ts/Option';
import { isolate, bind, empty, Runtime } from '../Runtime/Runtime';
import { compose } from '../Runtime/compose';
import { ES1Undefined } from './ES1Undefined';
import { ES1Value } from './ES1Value';
import { compileStatement } from '../Statement/compileStatement';

export class ES1FunctionRepresentation extends ES1ObjectRepresentation {
  constructor(
    public name: BindingId,
    public formalParameters: BindingId[],
    public body: Block,
    public baseScope: ScopeId,
    properties: Map<ES1String, ES1PropertyRepresentation> = new Map(), //@TODO: Default props
    prototype: ES1Object | ES1Null = ES1Null.ES1Null(), //@TODO: Set this to Function object
  ) {
    super(
      properties,
      prototype,
      some((args, thisValue) => isolate(
        some(baseScope),
        escape => {
          const argsAsArray = Array.from(args);

          return compose(
            formalParameters.reduce((prev, bindingId, i) => compose(prev, bind<ES1Value>(argsAsArray[i] ? argsAsArray[i] : ES1Undefined.ES1Undefined(), bindingId)), empty<ES1Value>()),
            compose(
              bind(thisValue, 'this'),
              compileStatement(body, escape)
            )
          )
        }
      )),
      none
    ); //@TODO: Implement construct
  }
}

export class ES1Function extends ES1Object {
  declare protected representation: ES1FunctionRepresentation;

  static ES1Function(functionRepresentation: ES1FunctionRepresentation): Runtime<ES1Object>{
    return context => context.introduceObject(new ES1Function(functionRepresentation));
  }
}