import { Session } from '../../types';
import { SET_SESSION, SessionActionTypes } from './types';

type SessionState = Readonly<Session | null>;

const SessionReducer = (
  state: SessionState = null,
  action: SessionActionTypes,
): SessionState => {
  switch (action.type) {
    case SET_SESSION:
      return action.payload;
    default:
      return state;
  }
};

export default SessionReducer;
