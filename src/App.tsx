import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import store from './store';

import Home from './screens/Home';
import About from './screens/About';
import Room from './screens/Room';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ToastProvider placement="bottom-right">
        <Router>
          <main className="flex flex-col font-sans">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Home} />
              <Route path="/room" component={Room} />
            </Switch>
          </main>
        </Router>
      </ToastProvider>
    </Provider>
  );
};

export default App;
