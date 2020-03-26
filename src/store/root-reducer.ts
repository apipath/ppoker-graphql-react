import { combineReducers } from 'redux';

import session from './session/reducer';
import participants from './participants/reducer';
import observers from './observers/reducer';
import room from './room/reducer';

export const createRootReducer = () =>
  combineReducers({ session, participants, observers, room });

export default createRootReducer;
