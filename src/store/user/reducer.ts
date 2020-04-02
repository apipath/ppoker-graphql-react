import { RootAction } from 'typesafe-actions';

import { User } from '../../generated/graphql';
import { SET_USER } from './types';

type UserState = Readonly<User | null>;

const UserReducer = (
  state: UserState = null,
  action: RootAction,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default UserReducer;
