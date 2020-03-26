import { createStore, Middleware, applyMiddleware } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { RootState } from 'typesafe-actions';

import createRootReducer from './root-reducer';

const configureStore = (preloadedState?: RootState) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const allMiddleware: Array<Middleware> = [];
  if (isDevelopment) {
    allMiddleware.push(createLogger());
  }

  let middleware = applyMiddleware(...allMiddleware);
  if (isDevelopment) {
    const composeEnhancers = composeWithDevTools({});
    middleware = composeEnhancers(middleware);
  }

  const store = createStore(createRootReducer(), preloadedState, middleware);

  if (isDevelopment && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(createRootReducer());
    });
  }

  return store;
};

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default configureStore;
