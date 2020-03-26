import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

const render = (AppComponent: typeof App) =>
  ReactDOM.render(
    <Provider store={store}>
      <ToastProvider placement="bottom-right">
        <Router>
          <AppComponent />
        </Router>
      </ToastProvider>
    </Provider>,
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
