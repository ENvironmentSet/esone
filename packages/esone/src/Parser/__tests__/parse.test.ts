import tokenize from '../../Lexer';
import parse from '../parse';
import { isSome, chain } from 'fp-ts/lib/Option';

describe('Tests for Parser', () => {
  test('Should parse well sample source', () => {
    const sampleSource: string = `
    function func1(x, y, z) {
      for(var ax in x) {
        for(var aa = null; aa < NaN; aa++) {
          break;
        }
        continue;
      }
      if(y == undefined) {
        ;
        y + z;
      }
      return void (x, z);
    }
    function f(){ return 1; }
    func1("ab", 123);
    `;

    expect(isSome(chain(parse)(tokenize(sampleSource)))).toBeTruthy();
  });
});
