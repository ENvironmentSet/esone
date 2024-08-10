import { tokenize } from '../tokenize';
import { isSome } from 'fp-ts/lib/Option';

describe('Tests for Lexer', () => {
  test('Should tokenize well sample source', () => {
    const sampleSource: string = `
    function div(x, y) {
  
      if (y === 0) return NaN;
  
      return x / y;
    }
    `;

    //@ts-ignore
    console.dir(tokenize(sampleSource).value);

    expect(isSome(tokenize(sampleSource))).toBeTruthy();
  });
});