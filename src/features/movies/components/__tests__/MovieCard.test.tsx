import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieCard from '../MovieCard';

const movie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Overview',
  poster_path: '/x.jpg',
  backdrop_path: null,
  release_date: '2020-01-01',
  vote_average: 7.8,
};

test('renders movie card', () => {
  render(
    <MemoryRouter>
      <MovieCard movie={movie as any} />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: /view details for test movie/i })).toBeInTheDocument();
  expect(screen.getByText(/2020/i)).toBeInTheDocument();
});
