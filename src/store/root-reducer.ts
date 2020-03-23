import { combineReducers } from 'redux';

import session from './session/reducer';
import participants from './participants/reducer';
import observers from './observers/reducer';

export default combineReducers({ session, participants, observers });
