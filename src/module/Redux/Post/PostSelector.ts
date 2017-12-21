import { State } from './index';

export namespace PostSelector {
  export const select = (s: State) => s.post;
}
