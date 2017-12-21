import { List } from 'immutable';
import { Mapper } from 'module/Common';
import { Category } from './Category';

export { Category } from './Category';

export type Categories = List<Category>;

export namespace Categories {
  export const mapper = Mapper.immutableList(Category.mapper);

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
