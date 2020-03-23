import { Observer } from '../../types';
import {
  ObserversActionTypes,
  SET_OBSERVERS,
  ADD_OBSERVER,
  REMOVE_OBSERVER,
  UPDATE_OBSERVER,
} from './types';

type ObserversState = { [key: string]: Observer };

const ObserversReducer = (
  state: ObserversState = {},
  action: ObserversActionTypes,
): ObserversState => {
  switch (action.type) {
    case SET_OBSERVERS:
      return Object.fromEntries(action.payload.map(p => [p.id, p]));
    case UPDATE_OBSERVER: // fallthrough
    case ADD_OBSERVER: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case REMOVE_OBSERVER: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export default ObserversReducer;
