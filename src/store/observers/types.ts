import { Observer } from '../../types';

export const SET_OBSERVERS = 'OBSERVERS/SET_OBSERVERS';
export const UPDATE_OBSERVER = 'OBSERVERS/UPDATE_OBSERVER';
export const REMOVE_OBSERVER = 'OBSERVERS/REMOVE_OBSERVER';
export const ADD_OBSERVER = 'OBSERVERS/ADD_OBSERVER';

interface SetObservers {
  type: typeof SET_OBSERVERS;
  payload: Array<Observer>;
}

interface UpdateObserver {
  type: typeof UPDATE_OBSERVER;
  payload: Observer;
}

interface RemoveObserver {
  type: typeof REMOVE_OBSERVER;
  payload: Observer;
}

interface AddObserver {
  type: typeof ADD_OBSERVER;
  payload: Observer;
}

export type ObserversActionTypes =
  | SetObservers
  | UpdateObserver
  | AddObserver
  | RemoveObserver;
