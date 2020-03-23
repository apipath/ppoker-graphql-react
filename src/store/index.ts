import { createStore, compose } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

import rootReducer from './root-reducer';

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  (process?.env?.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
    compose,
);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
