import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Room from './screens/Room';

const App: React.FC = () => {
  return (
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
  );
};

export default App;
