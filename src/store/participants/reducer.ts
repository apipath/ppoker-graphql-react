import { Participant } from '../../types';
import {
  ParticipantsActionTypes,
  SET_PARTICIPANTS,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  UPDATE_PARTICIPANT,
} from './types';

type ParticipantsState = Readonly<{ [key: string]: Readonly<Participant> }>;

const mockedParticipants = [
  { id: '1', username: 'Foo', voteLabel: '8' },
  { id: '2', username: 'React', voteLabel: undefined },
  { id: '12345', username: 'Bar', voteLabel: '8' },
  { id: '4', username: 'Elixir', voteLabel: '3' },
  { id: '5', username: 'Baz', voteLabel: '8' },
  { id: '6', username: 'Golang', voteLabel: '1' },
  { id: '7', username: 'GraphQL', voteLabel: '8' },
];

const initialState = mockedParticipants.reduce<{ [key: string]: Participant }>(
  (obj, p) => {
    obj[p.id] = p;
    return obj;
  },
  {},
);

const ParticipantsReducer = (
  state: ParticipantsState = initialState,
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
