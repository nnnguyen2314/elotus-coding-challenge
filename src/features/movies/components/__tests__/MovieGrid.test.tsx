import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieGrid from '../MovieGrid';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';

const movies = [
  { id: 1, title: 'A', release_date: '2020-01-01', poster_path: null, backdrop_path: null, overview: '', vote_average: 7.1 },
  { id: 2, title: 'B', release_date: '2021-01-01', poster_path: null, backdrop_path: null, overview: '', vote_average: 6.2 },
] as any;

describe('MovieGrid', () => {
  it('renders grid of cards when layout is grid', () => {
    render(<MovieGrid movies={movies} layout="grid" />, { wrapper: withAllProviders() as any });
    expect(screen.getByRole('link', { name: /view details for a/i })).toBeInTheDocument();
    expect(screen.getByRole('grid', { name: /movies grid/i })).toBeInTheDocument();
  });

  it('renders table when layout is list', () => {
    render(<MovieGrid movies={movies} layout="list" />, { wrapper: withAllProviders() as any });
    expect(screen.getByRole('table', { name: /movies list/i })).toBeInTheDocument();
  });
});
