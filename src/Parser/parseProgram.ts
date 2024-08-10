import Parser from './Parser';
import { SourceElement, Program, program } from './AST';
import { cons } from 'fp-ts/lib/Array';
import parseStatement from './Statement';
import parseDeclaration from './Declaration';
import TokenState, { tokenState } from './TokenState';
import composeTokenStates from './composeTokenStates';

const parseSourceElement: Parser<SourceElement> = composeTokenStates<SourceElement>(
  parseDeclaration,
  parseStatement
);

const parseSourceElements: TokenState<SourceElement[]> = composeTokenStates(
  tokenState.chain(
    parseSourceElement,
    sourceElement => tokenState.map(
      parseSourceElements,
      sourceElements => cons(sourceElement, sourceElements)
    )
  ),
  tokenState.of([] as SourceElement[])
);

export const parseProgram: Parser<Program> = tokenState.map(
  parseSourceElements,
  program
);

export default parseProgram;
