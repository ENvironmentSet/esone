export interface This {
  readonly type: 'This';
}

export function thisKeyword(): This {
  return { type: 'This' };
}

export default This;
