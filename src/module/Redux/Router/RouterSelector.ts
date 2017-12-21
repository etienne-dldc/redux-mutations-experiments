import { CoreState } from 'module/Core';

export namespace RouterSelector {
  export const selectPathname = (s: CoreState) => s.location.pathname;
}
