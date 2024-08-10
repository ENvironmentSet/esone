import { Immutable } from '../../utils/Immutable/Immutable';
import { Runtime } from '../Runtime/Runtime';
import { ES1Boolean } from './ES1Boolean';
import { ES1Number } from './ES1Number';
import { ES1String } from './ES1String';
import { ES1Object } from './ES1Object';
import { ES1Primitive } from './ES1Primitive';

export abstract class ES1Value extends Immutable {
  protected constructor(
    protected representation: unknown,
  ) {
    super();
  }

  public static equals(x: ES1Value, y: ES1Value): boolean { //@TODO Better comparison model
    return x.constructor === y.constructor && x.representation === y.representation;
  }

  public abstract toPrimitive(): Runtime<ES1Primitive>;
  public abstract toBoolean(): Runtime<ES1Boolean>;
  public abstract toNumber(): Runtime<ES1Number>;
  public abstract toString(): Runtime<ES1String>;
  public abstract toObject(): Runtime<ES1Object>;
}
