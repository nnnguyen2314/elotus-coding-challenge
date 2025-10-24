import React from 'react';
import { useTopRated, useSearchMovies } from '../hooks/useMovies';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import MovieGrid from '../components/MovieGrid';
import { useAppSelector } from '../../../shared/store';
import { useSearch } from '../../../shared/context/SearchContext';

const TopRatedContainer: React.FC = () => {
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const { query } = useSearch();
  const qp = useTopRated();
  const qs = useSearchMovies(query);
  const data = query ? qs.data : qp.data;
  const isLoading = query ? qs.isLoading : qp.isLoading;
  const isError = query ? qs.isError : qp.isError;
  const refetch = query ? qs.refetch : qp.refetch;

  if (isLoading) return <Loader full />;
  if (isError) return <ErrorMessage onRetry={refetch} message={query ? 'Failed to search movies.' : 'Failed to load top rated.'} />;
  return <MovieGrid movies={data?.results || []} layout={viewMode} />;
};

export default TopRatedContainer;
