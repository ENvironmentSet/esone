# esone

esone is ECMAScript 1 implementation by typescript

You can find Specification of ECMAScript 1 in [here](https://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262,%201st%20edition,%20June%201997.pdf)

## API

TBD

## Roadmap

- [x] Build Lexer
- [ ] Build Parser
- [ ] Build Evaluator
- Check if there is any Cyclic dependency
- pre-release(Nov 2, 2019)
- [ ] Refactor Lexer
  - [ ] Minify Explicit typing 
  - [ ] Add Automata Algebra(AlgebraicAutomata)
  - [ ] Change module structure and names of LexemeRecognizer
  - [ ] Change structure of Token
  - [ ] Refactor `tokenize`
- [ ] Refactor Parser
  - [ ] Minify Explicit typing 
  - [ ] Add Matcher Module
- [ ] Refactor Evaluator
- version 0.1.0 release(Dec 15, 2019)
- [ ] Optimize Lexer
- [ ] Optimize Parser
- [ ] Add Parse tree optimizer
- version 0.1.1 release(Dec 25, 2019)
- [ ] Add ECMAScript core library
- version 1.0.0 release(Jan 1, 2019)
