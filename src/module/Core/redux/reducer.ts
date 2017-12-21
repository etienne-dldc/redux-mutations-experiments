import { createReducer } from '@etienne-dldc/redux-router-location';
import { combineReducers } from 'lib/misc';
import { browserHistory } from '../container';
import { CoreState } from './State';

export const reducer = combineReducers<CoreState>({
  location: createReducer(browserHistory.location),
});
