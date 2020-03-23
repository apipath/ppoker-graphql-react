import { RootAction } from 'typesafe-actions';

import { Session } from '../../types';
import { SET_SESSION } from './types';
import { JOIN_ROOM } from '../room/types';

type SessionState = Readonly<Session | null>;

const SessionReducer = (
  state: SessionState = null,
  action: RootAction,
): SessionState => {
  switch (action.type) {
    case SET_SESSION:
      return action.payload;
    case JOIN_ROOM:
      return action.payload.session;
    default:
      return state;
  }
};

export default SessionReducer;
