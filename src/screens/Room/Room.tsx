import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';

const RoomCreate = React.lazy(() => import('./Create'));
const RoomEdit = React.lazy(() => import('./Edit/Edit'));
const RoomShow = React.lazy(() => import('./Show'));

function Room() {
  const { path } = useRouteMatch();

  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Switch>
            <Route path={path} exact component={RoomCreate} />
            <Route path={`${path}/:id/edit`} component={RoomEdit} />
            <Route path={`${path}/:id`} component={RoomShow} />
          </Switch>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default Room;
