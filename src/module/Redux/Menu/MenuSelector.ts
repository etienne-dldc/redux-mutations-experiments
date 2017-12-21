import { State } from '../index';

export namespace MenuSelector {
  export const isOpen = (s: State) => s.menuOpen;
  export const selectMenu = (s: State) => s.menu;
}
