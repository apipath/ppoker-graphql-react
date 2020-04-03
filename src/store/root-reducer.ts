import { combineReducers } from 'redux';

import user from './user/reducer';

export const createRootReducer = () => combineReducers({ user });

export default createRootReducer;
