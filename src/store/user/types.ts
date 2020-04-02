import { User } from '../../generated/graphql';

export const SET_USER = 'user/setUser' as const;

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export type UserActionTypes = SetUserAction;
