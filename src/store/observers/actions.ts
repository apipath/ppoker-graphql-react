import {
  SET_OBSERVERS,
  UPDATE_OBSERVER,
  REMOVE_OBSERVER,
  ADD_OBSERVER,
} from './types';
import { Observer } from '../../types';

export const setObservers = (observers: Array<Observer>) => ({
  type: SET_OBSERVERS,
  payload: observers,
});

export const addObserver = (observer: Observer) => ({
  type: ADD_OBSERVER,
  payload: observer,
});

export const removeObserver = (observer: Observer) => ({
  type: REMOVE_OBSERVER,
  payload: observer,
});

export const updateObserver = (observer: Observer) => ({
  type: UPDATE_OBSERVER,
  payload: observer,
});
