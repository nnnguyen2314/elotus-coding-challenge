import React from 'react';
import { render, screen } from '@testing-library/react';
import { withAllProviders } from '../../../../test-utils/renderWithProviders';
import TopRatedContainer from '../TopRatedContainer';

jest.mock('../../hooks/useMovies', () => ({
  useTopRated: jest.fn(),
  useSearchMovies: jest.fn(),
}));

const { useTopRated, useSearchMovies } = jest.requireMock('../../hooks/useMovies');

describe('TopRatedContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows loader on initial load', () => {
    useSearchMovies.mockReturnValue({ isLoading: false, isError: false });
    useTopRated.mockReturnValue({ isLoading: true, isError: false, refetch: jest.fn() });
    render(<TopRatedContainer />, { wrapper: withAllProviders() as any });
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('renders items when data is loaded', () => {
    // Provide two distinct items to ensure unique keys and predictable rendering
    const results = [
      { id: 1, title: 'Top 1', release_date: '2018-01-01', poster_path: null, backdrop_path: null, overview: '', vote_average: 8.7 },
      { id: 2, title: 'Top 2', release_date: '2019-01-01', poster_path: null, backdrop_path: null, overview: '', vote_average: 8.3 },
    ];
    useSearchMovies.mockReturnValue({ isLoading: false, isError: false });
    useTopRated.mockReturnValue({ isLoading: false, isError: false, refetch: jest.fn(), data: { results, total_pages: 1 } });
    render(<TopRatedContainer />, { wrapper: withAllProviders() as any });
    expect(screen.getByRole('link', { name: /view details for top 1/i })).toBeInTheDocument();
  });

  it('shows error message', () => {
    useSearchMovies.mockReturnValue({ isLoading: false, isError: false });
    useTopRated.mockReturnValue({ isLoading: false, isError: true, refetch: jest.fn() });
    render(<TopRatedContainer />, { wrapper: withAllProviders() as any });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
