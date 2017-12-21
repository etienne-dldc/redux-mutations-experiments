import { Map } from 'immutable';
import { Wish } from '../Wish';
import { createSelector } from 'reselect';

/**
 * K = Key
 * D = Data
 */
export type WishCollection<K, D> = Map<K, Wish<D>>;

export namespace WishCollection {
  export const create = <K, D>(): WishCollection<K, D> => Map<K, Wish<D>>();

  export function updateOrSet<K, D>(
    model: WishCollection<K, D>,
    key: K,
    updater: (subModel: Wish<D>) => Wish<D>
  ): WishCollection<K, D> {
    return model.has(key) ? model.update(key, updater) : model.set(key, updater(Wish.createVoid()));
  }

  export function multipleResolved<K, D>(model: WishCollection<K, D>, values: Map<K, D>): WishCollection<K, D> {
    return model.withMutations(d => {
      values.forEach((data, key) => {
        d = updateOrSet(d, key, res => Wish.setResolved(res, data));
      });
      return d;
    });
  }

  /**
   * Selectors
   */

  type KeyProps<K> = { key: K };

  export const selectKeyProp = <K, D>(state: WishCollection<K, D>, props: KeyProps<K>) => props.key;

  export const selectByKey: <K, D>(state: WishCollection<K, D>, props: KeyProps<K>) => Wish<D> = createSelector(
    s => s,
    selectKeyProp,
    (collection, key) => collection.get(key, Wish.createVoid())
  );

  export const selectByKeyOrVoid: <K, D>(state: WishCollection<K, D>, props: KeyProps<K>) => Wish<D> = createSelector(
    s => s,
    selectKeyProp,
    (collection, key) => collection.get(key, Wish.createVoid())
  );

  export const selectIsVoidByKey = <K, D>(model: WishCollection<K, D>, key: K): boolean => {
    if (!model.has(key) || Wish.isVoid(model.get(key, Wish.createVoid()))) {
      return true;
    }
    return false;
  };
}
