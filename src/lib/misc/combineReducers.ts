import { Reducer, Action } from 'redux';

type ReducersMap<S> = { [K in keyof S]?: Reducer<S[K]> };

/**
 * Combines reducers to reduce object
 */
export function combineReducers<S>(map: ReducersMap<S>, initialState: S = {} as any): Reducer<S> {
  const keys: Array<Partial<keyof S>> = Object.keys(map) as Array<keyof S>;

  return (state: S = initialState, action: Action) => {
    let hasChanged: boolean = false;
    // tslint:disable-next-line:prefer-object-spread
    const next: S = Object.assign({}, state);

    keys.forEach(key => {
      const prevState: S[keyof S] = state[key as keyof S];
      const nextState: S[keyof S] = map && (map as any)[key](prevState, action);

      if (prevState !== nextState) {
        next[key] = nextState;
        hasChanged = true;
      }
    });

    return hasChanged ? next : state;
  };
}
