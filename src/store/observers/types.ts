import { Observer } from '../../types';

export const SET_OBSERVERS = 'observers/setObservers' as const;
export const UPDATE_OBSERVER = 'observers/updateObservers' as const;
export const REMOVE_OBSERVER = 'observers/removeObservers' as const;
export const ADD_OBSERVER = 'observers/addObserver' as const;

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
