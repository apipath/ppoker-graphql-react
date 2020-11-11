import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

it('renders without crashing', () => {
  render(<App />, { wrapper: MemoryRouter });

  // verify page content for expected route
  expect(
    screen.getByText(/Ppoker help teams during their planning sessions/i),
  ).toBeInTheDocument();
});
