import { createEntityWithState } from 'module/Redux/Common';

type Payloads = {
  toggle: null;
  setOff: null;
  setOn: null;
};

export const touchEntity = createEntityWithState<Payloads, boolean>()(
  'touch',
  false,
  {},
  {
    toggle: (s, p) => !s,
    setOff: (s, p) => false,
    setOn: (s, p) => true,
  }
);
