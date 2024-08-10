import Assignment from './Assignment';

export type Comma = Assignment |
  { readonly type: 'Comma', first: Comma, second: Assignment };

export function comma(first: Comma, second: Assignment): Comma {
  return { type: 'Comma', first, second };
}

export default Comma;
