import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieTable from '../MovieTable';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';

const movies = [
  { id: 1, title: 'Alpha', release_date: '2019-06-01', poster_path: null, backdrop_path: null, overview: '', vote_average: 8.5 },
  { id: 2, title: 'Beta', release_date: '2020-01-02', poster_path: null, backdrop_path: null, overview: '', vote_average: 7.2 },
] as any;

test('renders movie table rows and values', () => {
  render(<MovieTable movies={movies} />, { wrapper: withAllProviders() as any });
  expect(screen.getByRole('table', { name: /movies list/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /alpha/i })).toBeInTheDocument();
  expect(screen.getByText('2019')).toBeInTheDocument();
  expect(screen.getByText(/⭐ 7\.2/)).toBeInTheDocument();
});
