import { createReducer } from '@etienne-dldc/redux-router-location';
import { combineReducers, reduceReducers } from 'lib/misc';
import { browserHistory } from '../container';
import { CoreState } from './State';
import { createReduxReducer, reduceMutationReducers } from 'lib/redux-mut';
import * as AnyMut from 'lib/redux-mut/any';
import * as NumberMut from 'lib/redux-mut/number';
import * as StringMut from 'lib/redux-mut/string';
import * as ObjMut from 'lib/redux-mut/object';

const mutationReducer = reduceMutationReducers(AnyMut.reducer, NumberMut.reducer, StringMut.reducer, ObjMut.reducer);

export const reducer = reduceReducers(
  combineReducers<CoreState>({
    location: createReducer(browserHistory.location),
  }),
  createReduxReducer(mutationReducer)
);
