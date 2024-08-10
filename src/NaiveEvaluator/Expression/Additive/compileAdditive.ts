import { match } from '../../Runtime/match';
import { compileLeftHandSide } from '../LeftHandSide/compileLeftHandSide';
import { extendWithValue } from '../../Runtime/extendWithValue';
import { intro } from '../../Runtime/intro';
import { ES1Number } from '../../Type/ES1Number';
import { Addition, Subtraction } from '../../../Parser/AST/Expression/Additive';
import { ES1Value } from '../../Type/ES1Value';
import { AST } from '../../../Parser/AST';
import { Runtime } from '../../Runtime/Runtime';
import { getValue } from '../../Runtime/getValue';

export const compileAdditive: (ast: AST) => Runtime<ES1Value> = match<Addition, ES1Value>(
  'Addition',
  ({ left, right }) => extendWithValue(
    compileAdditive(left),
    left => extendWithValue(
      getValue(left),
      left => extendWithValue(
        compileAdditive(right),
        right => extendWithValue(
          getValue(right),
          right => extendWithValue(
            left.toNumber(),
            left => extendWithValue(
              right.toNumber(),
              right => intro(ES1Number.ES1Number(left.add(right))) //@TODO: Do type coercion.
            )
          )
        )
      )
    )
  ),
  match<Subtraction, ES1Value>(
    'Subtraction',
    ({ left, right }) => extendWithValue(
      compileAdditive(left),
      left => extendWithValue(
        getValue(left),
        left => extendWithValue(
          compileAdditive(right),
          right => extendWithValue(
            getValue(right),
            right => extendWithValue(
              left.toNumber(),
              left => extendWithValue(
                right.toNumber(),
                right => intro(ES1Number.ES1Number(left.sub(right))) //@TODO: Do type coercion.
              )
            )
          )
        )
      )
    ),
    compileLeftHandSide
  )
);