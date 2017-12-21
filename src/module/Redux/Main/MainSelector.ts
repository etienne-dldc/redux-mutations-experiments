import { State } from '../index';

export namespace MainSelector {
  export const isTouch = (s: State) => s.touch;
}
