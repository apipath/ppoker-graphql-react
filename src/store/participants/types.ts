import { Participant } from '../../types';

export const SET_PARTICIPANTS = 'PARTICIPANTS/SET_PARTICIPANTS';
export const UPDATE_PARTICIPANT = 'PARTICIPANTS/UPDATE_PARTICIPANT';
export const REMOVE_PARTICIPANT = 'PARTICIPANTS/REMOVE_PARTICIPANT';
export const ADD_PARTICIPANT = 'PARTICIPANTS/ADD_PARTICIPANT';

interface SetParticipants {
  type: typeof SET_PARTICIPANTS;
  payload: Array<Participant>;
}

interface UpdateParticipant {
  type: typeof UPDATE_PARTICIPANT;
  payload: Participant;
}

interface RemoveParticipant {
  type: typeof REMOVE_PARTICIPANT;
  payload: Participant;
}

interface AddParticipant {
  type: typeof ADD_PARTICIPANT;
  payload: Participant;
}

export type ParticipantsActionTypes =
  | SetParticipants
  | UpdateParticipant
  | AddParticipant
  | RemoveParticipant;
