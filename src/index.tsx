import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import buildApolloClient from './apollo';
import { WS_GRAPHQL_URI, HTTP_GRAPHQL_URI } from './constants';

const client = buildApolloClient(HTTP_GRAPHQL_URI, WS_GRAPHQL_URI);

ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastProvider placement="bottom-right">
      <Router>
        <App />
      </Router>
    </ToastProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
