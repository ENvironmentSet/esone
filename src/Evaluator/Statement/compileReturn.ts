import { Option, some } from 'fp-ts/Option';
import { Runtime } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { Return } from '../../Parser/AST/Statement/Return';
import { extendWithValue } from '../Runtime/extendWithValue';
import { intro } from '../Runtime/intro';
import { ES1Undefined } from '../Type/ES1Undefined';
import { compileExpression } from '../Expression/compileExpression';
import { getValue } from '../Runtime/getValue';

export const compileReturn: (ret: Return, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (ret, escape) => extendWithValue(
    ret.value === undefined ? intro(ES1Undefined.ES1Undefined()) : compileExpression(ret.value),
    result => extendWithValue(
      getValue(result),
      result => escape(some(result))
    )
);