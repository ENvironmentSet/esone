import AST from '../../../Parser/AST';
import { Runtime } from '../../Runtime/Runtime'
import { ES1Value } from '../../Type/ES1Value'
import { match } from '../../Runtime/match'
import Equals from '../../../Parser/AST/Expression/Equality/Equals'
import { extendWithValue } from '../../Runtime/extendWithValue'
import { getValue } from '../../Runtime/getValue'
import { ES1Boolean } from '../../Type/ES1Boolean'
import { intro } from '../../Runtime/intro'
import DoesNotEquals from '../../../Parser/AST/Expression/Equality/DoesNotEquals'
import { compileAdditive } from '../Additive/compileAdditive'
import { ES1Undefined } from '../../Type/ES1Undefined'
import { ES1Null } from '../../Type/ES1Null'
import { ES1Number } from '../../Type/ES1Number'
import { ES1String } from '../../Type/ES1String'
import { ES1Object } from '../../Type/ES1Object'

function abstractEqualityComparison(x: ES1Value, y: ES1Value): Runtime<ES1Boolean> {
  if (x.constructor === y.constructor) {
    if (x instanceof ES1Undefined || x instanceof ES1Null) return intro(ES1Boolean.ES1True());
    if (x instanceof ES1Number && y instanceof ES1Number) {
      if (x.isNaN() || y.isNaN()) return intro(ES1Boolean.ES1False());
      return intro(ES1Value.equals(x, y) ? ES1Boolean.ES1True() : ES1Boolean.ES1False());
    } else {
      if (x instanceof ES1String) return intro(ES1Value.equals(x, y) ? ES1Boolean.ES1True() : ES1Boolean.ES1False());
      if (x instanceof ES1Boolean) return intro(ES1Value.equals(x, y) ? ES1Boolean.ES1True() : ES1Boolean.ES1False());
      if (x instanceof ES1Object && y instanceof ES1Object) return intro(x.equals(y) ? ES1Boolean.ES1True() : ES1Boolean.ES1False());
      return intro(ES1Boolean.ES1False());
    }
  } else {
    if (x instanceof ES1Null && y instanceof ES1Undefined || x instanceof ES1Undefined && y instanceof ES1Null)
      return intro(ES1Boolean.ES1True());
    if (x instanceof ES1Number && y instanceof ES1String)
      return extendWithValue(
        y.toNumber(),
        y => abstractEqualityComparison(x, y)
      );
    if (x instanceof ES1String && y instanceof ES1Number)
      return extendWithValue(
        x.toNumber(),
        x => abstractEqualityComparison(x, y)
      );
    if (x instanceof ES1Boolean)
      return extendWithValue(
        x.toNumber(),
        x => abstractEqualityComparison(x, y)
      );
    if (y instanceof ES1Boolean)
      return extendWithValue(
        y.toNumber(),
        y => abstractEqualityComparison(x, y)
      );
    if ((x instanceof ES1Number || x instanceof ES1String || x instanceof ES1Boolean) && y instanceof ES1Object)
      return extendWithValue(
        y.toPrimitive(),
        y => abstractEqualityComparison(x, y)
      );
    if ((y instanceof ES1Number || y instanceof ES1String || y instanceof ES1Boolean) && x instanceof ES1Object)
      return extendWithValue(
        x.toPrimitive(),
        x => abstractEqualityComparison(x, y)
      );
    return intro(ES1Boolean.ES1False());
  }
}

export const compileEquality: (ast: AST) => Runtime<ES1Value> = match<Equals, ES1Value>(
  'Equals',
  ({ left, right }) => extendWithValue(
    compileEquality(left),
    left => extendWithValue(
      getValue(left),
      left => extendWithValue(
        compileEquality(right),
        right => extendWithValue(
          getValue(right),
          right => abstractEqualityComparison(left, right)
        )
      )
    )
  ),
  match<DoesNotEquals, ES1Value>(
    'DoesNotEquals',
    ({ left, right }) => extendWithValue(
      compileEquality(left),
      left => extendWithValue(
        getValue(left),
        left => extendWithValue(
          compileEquality(right),
          right => extendWithValue(
            getValue(right),
            right => extendWithValue(
              abstractEqualityComparison(left, right),
              equals => ES1Value.equals(equals, ES1Boolean.ES1True())
                ? intro(ES1Boolean.ES1False())
                : intro(ES1Boolean.ES1True())
            )
          )
        )
      )
    ),
    compileAdditive
  )
);