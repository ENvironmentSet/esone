import { Immutable } from '../../utils/Immutable/Immutable';

export abstract class ES1Value extends Immutable {
  protected constructor(
    protected representation: unknown,
  ) {
    super();
  }
}
