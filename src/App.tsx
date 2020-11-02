import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import Home from './screens/Home';
import About from './screens/About';
import Room from './screens/Room';

const App: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location) => {
      const page = location.pathname + location.search;
      ReactGA.set({ page });
      ReactGA.pageview(page);
    });
    return unlisten;
  }, [history]);

  return (
    <main className="flex flex-col w-full">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Home} />
        <Route path="/room" component={Room} />
      </Switch>
    </main>
  );
};

export default App;
