import { Participant } from '../../types';

export const SET_PARTICIPANTS = 'participants/setParticipants' as const;
export const UPDATE_PARTICIPANT = 'participants/updateParticipant' as const;
export const REMOVE_PARTICIPANT = 'participants/removeParticipant' as const;
export const ADD_PARTICIPANT = 'participants/addParticipant' as const;

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
