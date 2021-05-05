import { tokenize } from '../../Lexer';
import { parse } from '../../Parser';
import { compile } from '../compile';
import { Context } from '../Runtime/Context';
import { isSome, chain, map, getRight, getLeft } from 'fp-ts/Option';
import { identity, pipe } from 'fp-ts/function';
import { snd } from 'fp-ts/Tuple';

describe('Tests for Compiler', () => {
  test('Should compile well sample source', () => {
    const sampleSource: string = `
      var counter = 0;
      
      function inc(x) {
        var inner = x - 5;
        counter = counter + x;
      
        return x + inner;
      }
      
      inc(inc(10));
    `;

    const compileResult = pipe(
      tokenize(sampleSource),
      chain(parse),
      map(compile),
      map(program => program(Context.createContext())(identity)),
    );

    map((x: any) => console.dir(x.scopes.get(1)))(map(snd)(chain(getRight)(compileResult)));
    map(console.log)(chain(getLeft)(compileResult));

    expect(isSome(compileResult)).toBeTruthy();
  });
});
