import { RootAction } from 'typesafe-actions';

import { Participant } from '../../types';
import {
  SET_PARTICIPANTS,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  UPDATE_PARTICIPANT,
} from './types';
import { JOIN_ROOM } from '../room/types';

const initialState = {};

const buildParticipants = (participants: Array<Participant>) =>
  Object.fromEntries(participants.map(p => [p.id, p]));

type ParticipantsState = Readonly<{ [key: string]: Readonly<Participant> }>;

const ParticipantsReducer = (
  state: ParticipantsState = initialState,
  action: RootAction,
): ParticipantsState => {
  switch (action.type) {
    case SET_PARTICIPANTS:
      return buildParticipants(action.payload);
    case UPDATE_PARTICIPANT: // fallthrough
    case ADD_PARTICIPANT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case REMOVE_PARTICIPANT: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case JOIN_ROOM:
      return buildParticipants(action.payload.participants);
    default:
      return state;
  }
};

export default ParticipantsReducer;
