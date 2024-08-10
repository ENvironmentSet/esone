import Expression from '../Expression';
import Block from './Block';
import Break from './Break';
import Continue from './Continue';
import Empty from './Empty';
import For from './For';
import ForIn from './ForIn';
import If from './If';
import Return from './Return';
import Variable from './Variable';
import While from './While';
import With from './With';

export type Statement = Expression | Block | Break | Continue | Empty |
                        For | ForIn | If | Return | While | Variable | With;

export default Statement;
