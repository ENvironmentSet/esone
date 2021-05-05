import { Option } from 'fp-ts/Option';
import { bind, empty, Runtime } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { Variable } from '../../Parser/AST';
import { compose } from '../Runtime/compose';
import { ES1Undefined } from '../Type/ES1Undefined';
import { extendWithValue } from '../Runtime/extendWithValue';
import { compileAssignment } from '../Expression/compileAssignment';
import { getValue } from '../Runtime/getValue';

export const compileVariable: (variable: Variable, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = variable => variable.variableDeclarationList.reduce(
    (prev, variableDeclaration) => context => compose<ES1Value>(
      prev,
      variableDeclaration.initializer ?
        extendWithValue(
          compileAssignment(variableDeclaration.initializer),
          initializer => extendWithValue(
            getValue(initializer),
            value => bind(value, variableDeclaration.identifier.lexeme)
          )
        )
        : bind(ES1Undefined.ES1Undefined(), variableDeclaration.identifier.lexeme)
    )(context),
    empty<ES1Value>()
);