import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

import Loading from './components/Loading';
import NotFound from './screens/NotFound';
import Home from './screens/Home';

const About = React.lazy(() => import('./screens/About'));
const Room = React.lazy(() => import('./screens/Room'));

const App: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const page = location.pathname + location.search;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  }, [location]);

  return (
    <main className="flex flex-col w-full">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/room/*" element={<Room />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
