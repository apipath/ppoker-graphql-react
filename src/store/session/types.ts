import { Session } from '../../generated/graphql';

export const SET_SESSION = 'session/setSession' as const;

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: Session;
}

export type SessionActionTypes = SetSessionAction;
