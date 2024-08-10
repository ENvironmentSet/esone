export interface Empty {
  readonly type: 'Empty';
}

export function empty(): Empty {
  return { type: 'Empty' };
}

export default Empty;
