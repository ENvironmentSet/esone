export interface Continue {
  readonly type: 'Continue';
}

export function continueStatement(): Continue {
  return { type: 'Continue' };
}

export default Continue;
