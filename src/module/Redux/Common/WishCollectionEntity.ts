import { WishCollection } from 'module/Model/WishCollection';
import { WishEntity } from './WishEntity';
import { Map } from 'immutable';
import { EntityAction, createEntityWithState, Entity } from './createEntityCreator';

export namespace WishCollectionEntity {
  type Payloads<K, D, DataPayloads extends { [key: string]: any }> = {
    byKeyAction: {
      key: K;
      resourceAction: EntityAction<WishEntity.Payloads<D, DataPayloads>[keyof WishEntity.Payloads<D, DataPayloads>]>;
    };
    multiplePullResolved: Map<K, D>;
  };

  export const createEntity = <K, D>() => <DataPayloads extends { [key: string]: any }, DataPayloadsParams>(
    entity: string,
    dataEntity: Entity<D, DataPayloads, DataPayloadsParams>,
    initialState: WishCollection<K, D> = WishCollection.create()
  ) => {
    const resourceEntity = WishEntity.createEntityTyped<D, DataPayloads, DataPayloadsParams>(
      `${entity}/resource`,
      dataEntity
    );
    return createEntityWithState<Payloads<K, D, DataPayloads>, WishCollection<K, D>>()(
      entity,
      initialState,
      resourceEntity.actionCreators,
      {
        byKeyAction: (state, payload) => {
          return WishCollection.updateOrSet(state, payload.key, res =>
            resourceEntity.reducer(res, payload.resourceAction)
          );
        },
        multiplePullResolved: (state, payload) => {
          return WishCollection.multipleResolved(state, payload);
        },
      }
    );
  };
}
