import { RootAction } from 'typesafe-actions';

import { Observer } from '../../types';
import {
  SET_OBSERVERS,
  ADD_OBSERVER,
  REMOVE_OBSERVER,
  UPDATE_OBSERVER,
} from './types';
import { JOIN_ROOM } from '../room/types';

const buildObservers = (observers: Array<Observer>) =>
  Object.fromEntries(observers.map(o => [o.id, o]));

type ObserversState = { [key: string]: Observer };

const ObserversReducer = (
  state: ObserversState = {},
  action: RootAction,
): ObserversState => {
  switch (action.type) {
    case SET_OBSERVERS:
      return buildObservers(action.payload);
    case UPDATE_OBSERVER: // fallthrough
    case ADD_OBSERVER: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case REMOVE_OBSERVER: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case JOIN_ROOM:
      return buildObservers(action.payload.observers);
    default:
      return state;
  }
};

export default ObserversReducer;
