import mapValues from 'lodash/mapValues';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import reduce from 'lodash/reduce';
import isFunction from 'lodash/isFunction';

export type ActionCreators<Payloads extends { [key: string]: any }, PayloadParams> = {
  [K in keyof Payloads]: (payload: PayloadCreator<PayloadParams, Payloads[K]>) => EntityAction<Payloads[K]>
};

export type PayloadCreator<PayloadParams, Payload> = Payload | ((params: PayloadParams) => Payload);

export type EntityAction<Payload> = { type: string; payload: Payload };

export type EntityCreatorItemObject<State, Payload> = {
  actionType: string;
  reducer: (state: State, action: EntityAction<Payload>) => State;
};

export type EntityCreatorItem<State, Payload> =
  | EntityCreatorItemObject<State, Payload>
  | ((state: State, payload: Payload) => State);

export type Entity<State, Payloads extends { [key: string]: any }, PayloadParams = null> = {
  reducer: (state: State, action: any) => State;
  actionCreators: ActionCreators<Payloads, PayloadParams>;
};

export const createEntityCreator = <Payloads extends { [key: string]: any }>() => <
  State,
  PayloadParams,
  Items extends { [K in keyof Payloads]: EntityCreatorItem<State, Payloads[K]> }
>(
  initalState: State,
  payloadParams: PayloadParams,
  items: Items
) => (entity: string): Entity<State, Payloads, PayloadParams> => {
  const normalizedItems = mapValues(items, (item: EntityCreatorItem<State, any>, key): EntityCreatorItemObject<
    State,
    any
  > => {
    const actionType = `entity/${entity}/${key}`;
    if (isFunction(item)) {
      return {
        reducer: item,
        actionType,
      };
    }
    return {
      actionType,
      ...item,
    };
  });
  return {
    reducer: (state: State = initalState, action: any) => {
      if (!action || !isPlainObject(action) || !isString(action.type)) {
        return state;
      }
      return reduce(
        normalizedItems,
        (accState, item) => {
          if (action.type === item.actionType) {
            return item.reducer(accState, action.payload);
          }
          return accState;
        },
        state
      );
    },
    actionCreators: mapValues(normalizedItems, (item, key) => {
      return (payload: PayloadCreator<Payloads[keyof Payloads], PayloadParams>): EntityAction<any> => {
        const thePayload = isFunction(payload) ? payload(payloadParams) : payload;
        return {
          type: item.actionType,
          payload: thePayload,
        };
      };
    }),
  };
};

export const createEntity = <Payloads extends { [key: string]: any }>() => <
  State,
  PayloadParams,
  Items extends { [K in keyof Payloads]: EntityCreatorItem<State, Payloads[K]> }
>(
  entity: string,
  initalState: State,
  payloadParams: PayloadParams,
  items: Items
): Entity<State, Payloads, PayloadParams> => createEntityCreator<Payloads>()(initalState, payloadParams, items)(entity);

export const createEntityWithState = <Payloads extends { [key: string]: any }, State>() => <
  PayloadParams,
  Items extends { [K in keyof Payloads]: EntityCreatorItem<State, Payloads[K]> }
>(
  entity: string,
  initalState: State,
  payloadParams: PayloadParams,
  items: Items
): Entity<State, Payloads, PayloadParams> => createEntityCreator<Payloads>()(initalState, payloadParams, items)(entity);

export const identityEntity = createEntityCreator<{}>()({} as any, {}, {})('identityEntity');
