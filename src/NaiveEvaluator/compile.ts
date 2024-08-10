import { Program, AST } from '../Parser/AST';
import { empty, isolate, Runtime } from './Runtime/Runtime';
import { compose } from './Runtime/compose';
import { match } from './Runtime/match';
import { compileDeclaration } from './Declaration/compileDeclaration';
import { compileStatement } from './Statement/compileStatement';
import { ES1Value } from './Type/ES1Value';
import { none, Option } from 'fp-ts/Option';

const compileSourceElement: (ast: AST, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (ast, escape) => match(
    'Fn',
    compileDeclaration,
    ast => compileStatement(ast, escape),
  )(ast);

export const compile: (program: Program) => Runtime<ES1Value>
  = program => isolate(none, escape => compose(program.sourceElements.reduce((prev, sourceElement) => compose(prev, compileSourceElement(sourceElement, escape)), empty<ES1Value>()), escape(none)));