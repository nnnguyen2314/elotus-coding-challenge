import React from 'react';
import { render, screen } from '@testing-library/react';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';
import NowPlayingContainer from '../NowPlayingContainer';

jest.mock('../../hooks/useMovies', () => ({
  useNowPlaying: jest.fn(),
  useSearchMovies: jest.fn(),
}));

const { useNowPlaying, useSearchMovies } = jest.requireMock('../../hooks/useMovies');

describe('NowPlayingContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows loader on initial load', () => {
    useSearchMovies.mockReturnValue({ isLoading: false, isError: false });
    useNowPlaying.mockReturnValue({ isLoading: true, isError: false, refetch: jest.fn() });
    render(<NowPlayingContainer />, { wrapper: withAllProviders() as any });
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('renders items when data is loaded', () => {
    const results = [
      { id: 1, title: 'Movie 1', release_date: '2020-01-01', poster_path: null, backdrop_path: null, overview: '', vote_average: 6.7 },
    ];
    useSearchMovies.mockReturnValue({ isLoading: false, isError: false });
    useNowPlaying.mockReturnValue({ isLoading: false, isError: false, refetch: jest.fn(), data: { results, total_pages: 1 } });
    render(<NowPlayingContainer />, { wrapper: withAllProviders() as any });
    expect(screen.getByRole('link', { name: /view details for movie 1/i })).toBeInTheDocument();
  });

  it('shows error message', () => {
    useSearchMovies.mockReturnValue({ isLoading: false, isError: false });
    useNowPlaying.mockReturnValue({ isLoading: false, isError: true, refetch: jest.fn() });
    render(<NowPlayingContainer />, { wrapper: withAllProviders() as any });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
