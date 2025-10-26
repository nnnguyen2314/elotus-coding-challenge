import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNowPlaying, useTopRated, useSearchMovies } from '../useMovies';

function Wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

// Separate harnesses to avoid conditional hook calls that violate react-hooks/rules-of-hooks
function NowPlayingHarness({ page = 1 }: { page?: number }) {
  const res = useNowPlaying(page);
  return (
    <div>
      <div data-testid="status">{res.isLoading ? 'loading' : res.isError ? 'error' : 'success'}</div>
      <div data-testid="has-data">{res.data ? 'yes' : 'no'}</div>
    </div>
  );
}

function TopRatedHarness({ page = 1 }: { page?: number }) {
  const res = useTopRated(page);
  return (
    <div>
      <div data-testid="status">{res.isLoading ? 'loading' : res.isError ? 'error' : 'success'}</div>
      <div data-testid="has-data">{res.data ? 'yes' : 'no'}</div>
    </div>
  );
}

function SearchHarness({ query = '', page = 1 }: { query?: string; page?: number }) {
  const res = useSearchMovies(query, page);
  return (
    <div>
      <div data-testid="status">{res.isLoading ? 'loading' : res.isError ? 'error' : 'success'}</div>
      <div data-testid="has-data">{res.data ? 'yes' : 'no'}</div>
    </div>
  );
}

describe('useMovies hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ page: 1, results: [{ id: 1 }], total_pages: 10, total_results: 100 }) });
  });

  it('useNowPlaying hits now_playing endpoint with page param', async () => {
    render(<Wrapper><NowPlayingHarness page={2} /></Wrapper>);
    await waitFor(() => expect(screen.getByTestId('has-data')).toHaveTextContent('yes'));
    expect(global.fetch).toHaveBeenCalled();
    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain('/movie/now_playing');
    expect(url).toContain('page=2');
  });

  it('useTopRated hits top_rated endpoint', async () => {
    render(<Wrapper><TopRatedHarness /></Wrapper>);
    await waitFor(() => expect(screen.getByTestId('has-data')).toHaveTextContent('yes'));
    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain('/movie/top_rated');
  });

  it('useSearchMovies is disabled when query empty', async () => {
    render(<Wrapper><SearchHarness query="" /></Wrapper>);
    // Give react-query a tick
    await waitFor(() => expect(screen.getByTestId('has-data')).toHaveTextContent('no'));
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('useSearchMovies calls search endpoint when query provided', async () => {
    render(<Wrapper><SearchHarness query="batman" page={3} /></Wrapper>);
    await waitFor(() => expect(screen.getByTestId('has-data')).toHaveTextContent('yes'));
    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toContain('/search/movie');
    expect(url).toContain('query=batman');
    expect(url).toContain('page=3');
  });
});
