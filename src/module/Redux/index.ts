import { CoreState, Core } from 'module/Core';
import { State as RouterState } from './Router';
import { State as MenuState } from './Menu';
import { State as CategoriesState } from './Categories';
import { State as PageListState } from './PageList';
import { State as PostListState } from './PostList';
import { State as PageState } from './Page';
import { State as PostState } from './Post';
import { State as MainState } from './Main';
import { Dispatchable as YDispatchable, Detectors as YDetectors, Detector as YDetector } from 'lib/redux-yarl';

export type State = MainState &
  CoreState &
  RouterState &
  MenuState &
  CategoriesState &
  PageListState &
  PostListState &
  PageState &
  PostState;

export type Dispatchable = YDispatchable<State, Core>;
export type Detectors = YDetectors<State, Core>;
export type Detector = YDetector<State, Core>;
