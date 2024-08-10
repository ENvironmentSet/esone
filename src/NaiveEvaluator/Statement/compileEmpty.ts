import { Option } from 'fp-ts/Option';
import { Runtime, empty } from '../Runtime/Runtime';
import { ES1Value } from '../Type/ES1Value';
import { Empty } from '../../Parser/AST/Statement/Empty';

export const compileEmpty: (empty: Empty, escape: (result: Option<ES1Value>) => Runtime<ES1Value>) => Runtime<ES1Value>
  = empty;