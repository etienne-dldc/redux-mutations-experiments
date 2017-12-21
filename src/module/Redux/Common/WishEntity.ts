import { Wish } from 'module/Model/Wish';
import { createEntityWithState, Entity, EntityAction, ActionCreators } from './createEntityCreator';

export namespace WishEntity {
  export type Payloads<D, DataPayloads extends { [key: string]: any }> = {
    pending: null;
    resolved: D;
    rejected: any;
    dataAction: EntityAction<DataPayloads[keyof DataPayloads]>;
  };

  export type ResourceActionCreators<
    D,
    DataPayloads extends { [key: string]: any },
    DataPayloadsParams
  > = ActionCreators<Payloads<D, DataPayloads>, ActionCreators<DataPayloads, DataPayloadsParams>>;

  export const createEntity = <D>() => <DataPayloads extends { [key: string]: any }, DataPayloadsParams>(
    entity: string,
    dataEntity: Entity<D, DataPayloads, DataPayloadsParams>,
    initialState: Wish<D> = Wish.createVoid()
  ) => createEntityTyped<D, DataPayloads, DataPayloadsParams>(entity, dataEntity, initialState);

  export const createEntityTyped = <D, DataPayloads extends { [key: string]: any }, DataPayloadsParams>(
    entity: string,
    dataEntity: Entity<D, DataPayloads, DataPayloadsParams>,
    initialState: Wish<D> = Wish.createVoid()
  ) => {
    return createEntityWithState<Payloads<D, DataPayloads>, Wish<D>>()(
      entity,
      initialState,
      dataEntity.actionCreators,
      {
        pending: (s, payload) => {
          return Wish.setPending(s);
        },
        resolved: (s, p) => Wish.setResolved(s, p),
        rejected: (s, p) => {
          console.error(p);
          return Wish.setRejected(s, p);
        },
        dataAction: (s, payload) => {
          if (Wish.isResolved(s)) {
            return Wish.transform(s, content => dataEntity.reducer(content, payload));
          }
          console.warn(`Can't dispatch subAction on unresolve Resource`);
          return s;
        },
      }
    );
  };
}
