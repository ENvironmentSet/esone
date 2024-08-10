import Statement from './Statement';
import Declaration from './Declaration';

export type SourceElement = Statement | Declaration;

export interface Program {
  readonly type: 'Program';
  readonly sourceElements: SourceElement[];
}

export function program(sourceElements: SourceElement[]): Program {
  return { type: 'Program', sourceElements };
}

export default Program;
