import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from 'react-toast-notifications';
import { MockedProvider } from '@apollo/client/testing';

import App from './App';

const renderApp = () =>
  render(
    <MockedProvider>
      <MemoryRouter>
        <ToastProvider>
          <App />
        </ToastProvider>
      </MemoryRouter>
    </MockedProvider>,
  );

it('renders without crashing', () => {
  renderApp();

  // verify page content for expected route
  expect(
    screen.getByText(/Ppoker help teams during their planning sessions/i),
  ).toBeInTheDocument();
});
