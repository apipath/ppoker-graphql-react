import { SET_SESSION } from './types';
import { Session } from '../../generated/graphql';

export const setSession = (session: Session) => ({
  type: SET_SESSION,
  payload: session,
});
