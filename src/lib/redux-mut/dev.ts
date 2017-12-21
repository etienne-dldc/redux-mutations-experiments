import { Mutation } from './index';

export const actionSerializer = (action: Mutation<any>): any => {
  return {
    ...action,
    // type: 'object mutation',
    // initialType: action.type,
    type: action.type,
  };
};
