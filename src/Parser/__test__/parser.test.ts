import { tokenize } from '../../Lexer';
import { parse } from '../parse';
import { isSome, chain } from 'fp-ts/lib/Option';

describe('Tests for Parser', () => {
  test('Should parse well sample source', () => {
    const sampleSource: string = `
    function func1(x, y, z) {
      for(var ax in x) {
        for(var aa = 0; aa < 3; aa++) {
          break;
        }
        continue;
      }
      if(y == 1) {
        ;
        y += z;
      }
      return void (x, z);
    };
    
    func1.xx = 1;
    func1.yy = func1.xx + func1.xx;
    func2.zz = func1.xx + func1.yy;
  
    function func2(a, b, c) {
      with(func1) {
        return a * b / c - ( xx ? +yy : -zz );
      }
    }
  
    function Cons(a) {
      var b = 1;
      this.a = typeof a;
      return new Object;
    }
  
    func1(new Array(1,42,10.10, 0.123, .012,"a"), undefined, null);
    new Cons;
    `;

    expect(isSome(chain(parse)(tokenize(sampleSource)))).toBeTruthy();
  });
});