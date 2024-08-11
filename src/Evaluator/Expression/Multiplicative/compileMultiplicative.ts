import { match } from '../../Runtime/match';
import Multiplication from '../../../Parser/AST/Expression/Multiplicative/Multiplication';
import { extendWithValue } from '../../Runtime/extendWithValue';
import AST from '../../../Parser/AST';
import { ES1Value } from '../../Type/ES1Value';
import { Runtime } from '../../Runtime/Runtime';
import { getValue } from '../../Runtime/getValue';
import { intro } from '../../Runtime/intro';
import { ES1Number } from '../../Type/ES1Number';
import Division from '../../../Parser/AST/Expression/Multiplicative/Division';
import Remainder from '../../../Parser/AST/Expression/Multiplicative/Remainder';
import { compileLeftHandSide } from '../LeftHandSide/compileLeftHandSide';

export const compileMultiplicative: (ast: AST) => Runtime<ES1Value> = match<Multiplication, ES1Value>(
  'Multiplication',
  ({ left, right }) => extendWithValue(
    compileMultiplicative(left),
    left => extendWithValue(
      getValue(left),
      left => extendWithValue(
        compileMultiplicative(right),
        right => extendWithValue(
          getValue(right),
          right => extendWithValue(
            left.toNumber(),
            left => extendWithValue(
              right.toNumber(),
              right => intro(ES1Number.ES1Number(left.mul(right)))
            )
          )
        )
      )
    )
  ),
  match<Division, ES1Value>(
    'Division',
    ({ left, right }) => extendWithValue(
      compileMultiplicative(left),
      left => extendWithValue(
        getValue(left),
        left => extendWithValue(
          compileMultiplicative(right),
          right => extendWithValue(
            getValue(right),
            right => extendWithValue(
              left.toNumber(),
              left => extendWithValue(
                right.toNumber(),
                right => intro(ES1Number.ES1Number(left.div(right)))
              )
            )
          )
        )
      )
    ),
    match<Remainder, ES1Value>(
      'Remainder',
      ({ left, right }) => extendWithValue(
        compileMultiplicative(left),
        left => extendWithValue(
          getValue(left),
          left => extendWithValue(
            compileMultiplicative(right),
            right => extendWithValue(
              getValue(right),
              right => extendWithValue(
                left.toNumber(),
                left => extendWithValue(
                  right.toNumber(),
                  right => intro(ES1Number.ES1Number(left.rem(right)))
                )
              )
            )
          )
        )
      ),
      compileLeftHandSide
    )
  )
);