import AST from '../../Parser/AST';
import { Option } from 'fp-ts/Option';
import { Runtime } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { match } from '../Runtime/match';
import { Empty, Block, Return, Variable, If } from '../../Parser/AST';
import { compileEmpty } from './compileEmpty';
import { compileBlock } from './compileBlock';
import { compileReturn } from './compileReturn';
import { compileVariable } from './compileVariable';
import { compileExpression } from './compileExpression';
import { compileIf } from './compileIf'

export const compileStatement: (ast: AST, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = (ast, escape) => match<Empty, ES1Value>(
    'Empty',
    empty => compileEmpty(empty, escape),
    match<Block, ES1Value>(
      'Block',
      block => compileBlock(block, escape),
      match<Return, ES1Value>(
        'Return',
        ret => compileReturn(ret, escape),
        match<Variable, ES1Value>(
          'Variable',
          variable => compileVariable(variable, escape),
          match<If, ES1Value>(
            'If',
            ifStatement => compileIf(ifStatement, escape),
            ast => compileExpression(ast, escape)
          )
        )
      )
    )
)(ast);