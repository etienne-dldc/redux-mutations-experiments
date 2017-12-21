import { State } from './index';

export namespace PageSelector {
  export const select = (s: State) => s.page;
}
