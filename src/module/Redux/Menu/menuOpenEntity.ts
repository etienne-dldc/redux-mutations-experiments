import { createEntityWithState } from 'module/Redux/Common';

type Payloads = {
  toggle: null;
  setOff: null;
  setOn: null;
};

export const menuOpenEntity = createEntityWithState<Payloads, boolean>()(
  'menu',
  false,
  {},
  {
    toggle: (s, p) => !s,
    setOff: (s, p) => false,
    setOn: (s, p) => true,
  }
);
