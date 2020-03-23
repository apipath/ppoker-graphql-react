import { Session } from '../../types';

export const SET_SESSION = 'SESSION/SET_SESSION' as const;

interface SetSessionAction {
  type: typeof SET_SESSION;
  payload: Session;
}

export type SessionActionTypes = SetSessionAction;
