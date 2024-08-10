import { match } from '../../Runtime/match';
import { compileMember } from './compileMember';
import { CallOnly, Arguments } from '../../../Parser/AST/Expression/LeftHandSide';
import { ES1Value } from '../../Type/ES1Value';
import { extendWithValue } from '../../Runtime/extendWithValue';
import { Runtime, error } from '../../Runtime/Runtime';
import { getValue } from '../../Runtime/getValue';
import { ES1Object } from '../../Type/ES1Object';
import { ES1Reference } from '../../Type/ES1Reference';
import { ES1Undefined } from '../../Type/ES1Undefined';
import { getOrElse } from 'fp-ts/Option';
import { constant } from 'fp-ts/function';
import { intro } from '../../Runtime/intro';
import { ES1List } from '../../Type/ES1List';
import { compileAssignment } from '../compileAssignment';
import AST from '../../../Parser/AST';

const compileArguments: (args: Arguments) => Runtime<ES1List> =
    ([arg, ...tail]) => !arg ? intro(ES1List.ES1List()) : extendWithValue(compileArguments(tail), args => extendWithValue(compileAssignment(arg), argRef => extendWithValue(getValue(argRef), arg => intro(ES1List.ES1List(arg, ...args)))));

const invoke: (f: ES1Value, args: ES1List, thisValue: ES1Value) => Runtime<ES1Value>
  = (f, args, thisValue) => f instanceof ES1Object ? getOrElse<Runtime<ES1Value>>(constant(error('Fail to call')))(f.call(args, thisValue)) : error('Not a Function');

export const compileCall: (ast: AST) => Runtime<ES1Value> = match<CallOnly, ES1Value>(
  'Call',
  call => extendWithValue(
    compileCall(call.callee),
    calleeRef => extendWithValue(
      getValue(calleeRef),
      callee => extendWithValue(
        compileArguments(call.argumentList),
        //@TODO: Support globalThisObject fallback instead of setting 'undefined'.
        args => invoke(callee, args, calleeRef instanceof ES1Reference && calleeRef.base instanceof ES1Value ? calleeRef.base : ES1Undefined.ES1Undefined())
      )
    )
  ),
  compileMember
);