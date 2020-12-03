import { Program, SourceElement } from '../Parser/AST';
import { Runtime } from './Runtime/Runtime';
import { compose } from './Runtime/compose';
import { match } from './Runtime/match';
import { compileDeclaration } from './Declaration/compileDeclaration';
import { compileStatement } from './Statement/compileStatement';

const compileSourceElement: (sourceElement: SourceElement) => Runtime
  = match(
    'Fn',
    compileDeclaration,
    compileStatement,
  );

export const compile: (program: Program) => Runtime
  = program => compose(...program.sourceElements.map(compileSourceElement));