import { combineReducers } from 'lib/misc';
import { touchEntity } from './touchEntity';

export { MainAction } from './MainAction';
export { MainSelector } from './MainSelector';

export type State = {
  touch: boolean;
};

export const reducer = combineReducers<State>({
  touch: touchEntity.reducer,
});
