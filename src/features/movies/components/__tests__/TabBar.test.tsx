import React from 'react';
import { render, screen } from '@testing-library/react';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';
import TabBar from '../TabBar';

describe('TabBar', () => {
  it('highlights Now Playing on root route', () => {
    render(<TabBar />, { wrapper: withAllProviders({ routeEntries: ['/'] }) as any });
    const now = screen.getByRole('link', { name: /now playing/i });
    expect(now).toHaveClass('active');
  });
  it('highlights Top Rated on /top-rated', () => {
    render(<TabBar />, { wrapper: withAllProviders({ routeEntries: ['/top-rated'] }) as any });
    const top = screen.getByRole('link', { name: /top rated/i });
    expect(top).toHaveClass('active');
  });
});
