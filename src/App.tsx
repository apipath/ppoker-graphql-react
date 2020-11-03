import React, { useEffect, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';

import Loading from './components/Loading';
import Home from './screens/Home';

const About = React.lazy(() => import('./screens/About'));
const Room = React.lazy(() => import('./screens/Room'));

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
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/room" component={Room} />
        </Switch>
      </Suspense>
    </main>
  );
};

export default App;
