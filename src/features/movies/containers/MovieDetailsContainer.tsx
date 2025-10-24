import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovies';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import ImageWithFade from '../../../shared/components/ImageWithFade';

const MovieDetailsContainer: React.FC = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const { data, isLoading, isError, refetch } = useMovieDetails(movieId);

  if (isLoading) return <Loader full />;
  if (isError || !data) return <ErrorMessage onRetry={refetch} message="Failed to load movie details." />;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 320px) 1fr', gap: 16 }}>
      <ImageWithFade path={data.poster_path} alt={data.title} size="w500" />
      <div>
        <h1 style={{ marginTop: 0 }}>{data.title}</h1>
        <p>{data.overview}</p>
        {data.genres && <p>Genres: {data.genres.map(g => g.name).join(', ')}</p>}
        {data.runtime ? <p>Runtime: {data.runtime} min</p> : null}
        <p>Release: {data.release_date} • ⭐ {data.vote_average?.toFixed?.(1)}</p>
        {data.homepage && <a href={data.homepage} target="_blank" rel="noreferrer">Homepage</a>}
      </div>
    </div>
  );
};

export default MovieDetailsContainer;
