import { combineReducers } from 'redux';

import session from './session/reducer';

export const createRootReducer = () => combineReducers({ session });

export default createRootReducer;
