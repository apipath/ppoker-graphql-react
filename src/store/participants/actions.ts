import {
  SET_PARTICIPANTS,
  UPDATE_PARTICIPANT,
  REMOVE_PARTICIPANT,
  ADD_PARTICIPANT,
} from './types';
import { Participant } from '../../types';

export const setParticipants = (participants: Array<Participant>) => ({
  type: SET_PARTICIPANTS,
  payload: participants,
});

export const addParticipant = (participant: Participant) => ({
  type: ADD_PARTICIPANT,
  payload: participant,
});

export const removeParticipant = (participant: Participant) => ({
  type: REMOVE_PARTICIPANT,
  payload: participant,
});

export const updateParticipant = (participant: Participant) => ({
  type: UPDATE_PARTICIPANT,
  payload: participant,
});
