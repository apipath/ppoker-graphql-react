import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import RoomCreate from './Create';
import RoomShow from './Show';
import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';

function Room() {
  const { path } = useRouteMatch();

  return (
    <>
      <Header />
      <ErrorBoundary>
        <Switch>
          <Route path={path} exact component={RoomCreate} />
          <Route path={`${path}/:id`} component={RoomShow} />
        </Switch>
      </ErrorBoundary>
    </>
  );
}

export default Room;
