import { categoriesEntity } from './categoriesEntity';
import { Dispatchable } from '../index';
import { MelezeApi } from 'module/Service/MelezeApi';

export namespace CategoriesAction {
  export const fetchCategories = (): Dispatchable => [
    categoriesEntity.actionCreators.pending(null),
    MelezeApi.getCategories()
      .then(categories => categoriesEntity.actionCreators.resolved(categories))
      .catch(e => categoriesEntity.actionCreators.rejected(e)),
  ];
}
