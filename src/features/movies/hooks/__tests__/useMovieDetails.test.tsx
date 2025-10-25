import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMovieDetails } from '../useMovies';

function Wrapper({ children }: { children: React.ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

function Harness({ id }: { id: number }) {
  const q = useMovieDetails(id);
  return <div data-testid="status">{q.isLoading ? 'loading' : q.isError ? 'error' : q.data ? 'success' : 'idle'}</div>;
}

describe('useMovieDetails', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ id: 42, title: 'X' }) });
  });

  it('requests movie details by id', async () => {
    render(<Wrapper><Harness id={42} /></Wrapper>);
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('success'));
    const url = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    expect(url).toMatch(/\/movie\/42/);
  });
});
