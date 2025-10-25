import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { withAllProviders } from './test-utils/renderWithProviders';

test('renders app header and tabs', () => {
  render(<App />, { wrapper: withAllProviders() as any });
  // Verify the TabBar renders and "Now Playing" tab is present
  const nowPlaying = screen.getByRole('link', { name: /now playing/i });
  expect(nowPlaying).toBeInTheDocument();
});
