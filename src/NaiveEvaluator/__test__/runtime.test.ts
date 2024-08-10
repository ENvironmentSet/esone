import { isolate, extend, run, ref, bind } from '../Runtime/Runtime';
import { extendWithValue } from '../Runtime/extendWithValue';
import { Context } from '../Runtime/Context';
import { none } from 'fp-ts/Option';
import { ES1Boolean } from '../Type/ES1Boolean';
import { intro } from '../Runtime/intro';
import { ES1Value } from '../Type/ES1Value';
import { compose } from '../Runtime/compose';
import { getValue } from '../Runtime/getValue';

describe('Tests for Runtime', () => {
  const testContext = Context.createContext();

  test('Early Exit', () => {
    const runtime = extendWithValue(
      intro(ES1Boolean.ES1True()),
      value => compose(
        bind(value, 'a'),
        extendWithValue(
          ref('a'),
          value => isolate<ES1Value>(none, escape => extend(
            getValue(value),
            value => compose(
              compose(
                escape(value),
                intro(ES1Boolean.ES1False())
              ),
              intro(ES1Boolean.ES1False())
            )
          ))
        )
      )
    );

    const x = run(testContext, runtime);

    console.log(x);

    expect(x).toBeTruthy();
  });
});