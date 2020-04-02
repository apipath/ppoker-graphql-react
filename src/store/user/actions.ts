import { SET_USER } from './types';
import { User } from '../../generated/graphql';

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});
