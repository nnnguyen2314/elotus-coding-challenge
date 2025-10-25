import React, { useMemo } from 'react';
import { Movie } from '../misc/types';
import MovieCard from './MovieCard';
import MovieTable from './MovieTable';

const MovieGrid: React.FC<{ movies: Movie[]; layout: 'grid'|'list' }> = ({ movies, layout }) => {
  // Hooks must not be conditional; compute items first
  const items = useMemo(() => movies.map(m => (
    <MovieCard key={m.id} movie={m} layout={layout} />
  )), [movies, layout]);

  if (layout === 'list') {
    // Render as table view when list mode is selected
    return <MovieTable movies={movies} />;
  }
  return <div className="movie-grid" role="grid" aria-label="Movies grid">{items}</div>;
};

export default React.memo(MovieGrid);
