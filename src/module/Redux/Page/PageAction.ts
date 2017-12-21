import { pageEntity } from './pageEntity';
import { Dispatchable } from '../index';
import { MelezeApi } from 'module/Service/MelezeApi';
import { PageKey } from './index';

export namespace PageAction {
  export const fetchPage = (key: PageKey): Dispatchable => [
    pageEntity.actionCreators.byKeyAction(res => ({ key, resourceAction: res.pending(null) })),
    MelezeApi.getPage(key)
      .then(page => pageEntity.actionCreators.byKeyAction(res => ({ key, resourceAction: res.resolved(page) })))
      .catch(e => pageEntity.actionCreators.byKeyAction(res => ({ key, resourceAction: res.rejected(e) }))),
  ];
}
