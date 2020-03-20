import { Participant } from '../../types';
import {
  ParticipantsActionTypes,
  SET_PARTICIPANTS,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  UPDATE_PARTICIPANT,
} from './types';

type ParticipantsState = Readonly<{ [key: string]: Readonly<Participant> }>;

const ParticipantsReducer = (
  state: ParticipantsState = {},
  action: ParticipantsActionTypes,
): ParticipantsState => {
  switch (action.type) {
    case SET_PARTICIPANTS:
      return Object.fromEntries(action.payload.map(p => [p.id, p]));
    case UPDATE_PARTICIPANT: // fallthrough
    case ADD_PARTICIPANT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case REMOVE_PARTICIPANT: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export default ParticipantsReducer;
