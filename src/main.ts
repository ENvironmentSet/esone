import { open } from 'node:fs/promises';
import { tokenize } from './Lexer';
import { pipe } from 'fp-ts/function';
import { map as optionMap, chain } from 'fp-ts/Option';
import { parse } from './Parser';
import { compile } from './Evaluator/compile';
import { Context } from './Evaluator/Runtime/Context';
import { isLeft } from 'fp-ts/Either';
import { run, bind } from './Evaluator/Runtime/Runtime';
import { ES1Function, ES1FunctionExoticRepresentation } from './Evaluator/Type/ES1Function';
import { ES1Undefined } from './Evaluator/Type/ES1Undefined';
import { intro } from './Evaluator/Runtime/intro';
import { extendWithValue } from './Evaluator/Runtime/extendWithValue';
import { compose } from './Evaluator/Runtime/compose';
import { map } from './Evaluator/Runtime/map';
import { ES1Value } from './Evaluator/Type/ES1Value'
import { ES1String } from './Evaluator/Type/ES1String'

(async () => {
  const sourceFilePath = process.argv[2];

  const sourceFile = await open(sourceFilePath);
  const code = await sourceFile.readFile({ encoding: 'utf-8' });

  console.log(
    pipe(
      tokenize(code),
      chain(parse),
      optionMap(compile),
      optionMap(program => run(
          Context.createContext(),
          extendWithValue(
            ES1Function.ES1Function(
              new ES1FunctionExoticRepresentation(
                'print',
                args => {
                  for (const arg of args)
                    return map<ES1String, ES1Value>(
                      str => {
                        console.log(str);

                        return ES1Undefined.ES1Undefined();
                      }
                    )(arg.toString());
                  return intro(ES1Undefined.ES1Undefined());
                }
              )
            ),
            print => compose(bind(print, 'print'), program)
          )
        )
      ),
      optionMap(result => {
        if (isLeft(result)) return `Error occurred: ${result.left.message}`
        else return 'program finished.'
      })
    )
  );
})()