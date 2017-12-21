import { menuOpenEntity } from './menuOpenEntity';
import { menuEntity } from './menuEntity';
import { Dispatchable } from '../index';
import { MelezeApi } from 'module/Service/MelezeApi';

export namespace MenuAction {
  export const toggleOpen = (): Dispatchable => menuOpenEntity.actionCreators.toggle(() => null);
  export const setOpen = (): Dispatchable => menuOpenEntity.actionCreators.setOn(() => null);
  export const setClose = (): Dispatchable => menuOpenEntity.actionCreators.setOff(() => null);

  export const fetchMenu = (): Dispatchable => [
    menuEntity.actionCreators.pending(null),
    MelezeApi.getMenu()
      .then(menu => menuEntity.actionCreators.resolved(menu))
      .catch(e => menuEntity.actionCreators.rejected(e)),
  ];
}
