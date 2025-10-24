import { useQuery } from '@tanstack/react-query';
import { tmdbFetch, TMDBListResponse } from '../../../shared/utils/api';
import { Movie, MovieDetails } from '../misc/types';

const defaultParams = { language: 'en-US', page: 1 };

export const useNowPlaying = (page = 1) =>
  useQuery({
    queryKey: ['movies', 'now_playing', page],
    queryFn: () => tmdbFetch<TMDBListResponse<Movie>>('/movie/now_playing', { ...defaultParams, page }),
  });

export const useTopRated = (page = 1) =>
  useQuery({
    queryKey: ['movies', 'top_rated', page],
    queryFn: () => tmdbFetch<TMDBListResponse<Movie>>('/movie/top_rated', { ...defaultParams, page }),
  });

export const useSearchMovies = (query: string, page = 1) =>
  useQuery({
    queryKey: ['movies', 'search', query, page],
    enabled: Boolean(query),
    queryFn: () => tmdbFetch<TMDBListResponse<Movie>>('/search/movie', { ...defaultParams, query, page, include_adult: false }),
  });

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ['movies', 'details', id],
    queryFn: () => tmdbFetch<MovieDetails>(`/movie/${id}`, { language: 'en-US' }),
  });
