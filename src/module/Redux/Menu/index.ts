import { combineReducers } from 'lib/misc';
import { menuOpenEntity } from './menuOpenEntity';
import { menuEntity } from './menuEntity';
import { Wish } from 'module/Model/Wish';
import { Menu } from 'module/Model/Menu';

export { MenuAction } from './MenuAction';
export { MenuSelector } from './MenuSelector';

export type State = {
  menuOpen: boolean;
  menu: Wish<Menu>;
};

export const reducer = combineReducers<State>({
  menuOpen: menuOpenEntity.reducer,
  menu: menuEntity.reducer,
});
