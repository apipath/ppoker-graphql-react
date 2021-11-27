import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';
import Loading from '../../components/Loading';

const RoomCreate = React.lazy(() => import('./Create'));
const RoomEdit = React.lazy(() => import('./Edit'));
const RoomShow = React.lazy(() => import('./Show'));

function Room() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <Routes>
            <Route path="" element={<RoomCreate />} />
            <Route path=":id/edit" element={<RoomEdit />} />
            <Route path=":id" element={<RoomShow />} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default Room;
