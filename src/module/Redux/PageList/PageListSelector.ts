import { State } from './index';

export namespace PageListSelector {
  export const select = (s: State) => s.pageList;
}
