import { touchEntity } from './touchEntity';
import { Dispatchable } from '../index';

export namespace MainAction {
  export const touched: Dispatchable = state => {
    if (state.touch === false) {
      return touchEntity.actionCreators.setOn(null);
    }
    return null;
  };
}
