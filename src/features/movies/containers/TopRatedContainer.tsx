import React, { useEffect, useRef, useState } from 'react';
import { useTopRated, useSearchMovies } from '../hooks/useMovies';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import MovieGrid from '../components/MovieGrid';
import { useAppSelector } from '../../../shared/store';
import { useSearch } from '../../../shared/context/SearchContext';
import { Movie } from '../misc/types';

const TopRatedContainer: React.FC = () => {
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const { query } = useSearch();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const qp = useTopRated(page);
  const qs = useSearchMovies(query, page);
  const active = query ? qs : qp;

  useEffect(() => {
    setPage(1);
    setItems([]);
    setTotalPages(undefined);
  }, [query]);

  useEffect(() => {
    const data = active.data;
    if (!data) return;
    setItems(prev => (page === 1 ? data.results : [...prev, ...data.results]));
    setTotalPages(data.total_pages);
  }, [active.data, page]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      if (active.isLoading || active.isError) return;
      if (totalPages && page >= totalPages) return;
      setPage(p => p + 1);
    }, { root: null, threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [active.isLoading, active.isError, totalPages, page, query]);

  if (active.isLoading && page === 1) return <Loader full />;
  if (active.isError && page === 1) return <ErrorMessage onRetry={active.refetch} message={query ? 'Failed to search movies.' : 'Failed to load top rated.'} />;

  return (
    <div>
      <MovieGrid movies={items} layout={viewMode} />
      {totalPages && page >= totalPages ? null : (
        <div ref={sentinelRef} className="loader" aria-hidden>
          {active.isLoading ? <div className="spinner" /> : null}
        </div>
      )}
    </div>
  );
};

export default TopRatedContainer;
