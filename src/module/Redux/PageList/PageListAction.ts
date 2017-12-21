import { pageListEntity } from './pageListEntity';
import { Dispatchable } from '../index';
import { MelezeApi } from 'module/Service/MelezeApi';

export namespace PageListAction {
  export const fetchPageList = (): Dispatchable => [
    pageListEntity.actionCreators.pending(null),
    MelezeApi.getPageList()
      .then(pageList => pageListEntity.actionCreators.resolved(pageList))
      .catch(e => pageListEntity.actionCreators.rejected(e)),
  ];
}
