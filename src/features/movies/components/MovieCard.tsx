import React from 'react';
import { Movie } from '../misc/types';
import ImageWithFade from '../../../shared/components/ImageWithFade';
import { Link } from 'react-router-dom';

const MovieCard: React.FC<{ movie: Movie; layout?: 'grid'|'list' }> = ({ movie, layout = 'grid' }) => {
  const content = (
    <div className="movie-card" tabIndex={0}>
      <ImageWithFade path={movie.poster_path} alt={movie.title} size={layout==='grid' ? 'w300' : 'w200'} />
      <div className="info">
        <h3>{movie.title}</h3>
        <p>{new Date(movie.release_date).getFullYear()} • ⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
  return <Link to={`/movie/${movie.id}`} aria-label={`View details for ${movie.title}`}>{content}</Link>;
};

export default React.memo(MovieCard);
