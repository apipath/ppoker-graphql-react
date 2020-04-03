import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import buildApolloClient from './apollo';
import { WS_GRAPHQL_URI, HTTP_GRAPHQL_URI } from './constants';

const store = configureStore();

const client = buildApolloClient(HTTP_GRAPHQL_URI, WS_GRAPHQL_URI);

const render = (AppComponent: typeof App) =>
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ToastProvider placement="bottom-right">
          <Router>
            <AppComponent />
          </Router>
        </ToastProvider>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root'),
  );

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
