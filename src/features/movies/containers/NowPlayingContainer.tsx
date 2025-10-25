import React, { useEffect, useRef, useState } from 'react';
import { useNowPlaying, useSearchMovies } from '../hooks/useMovies';
import Loader from '../../../shared/components/Loader';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import MovieGrid from '../components/MovieGrid';
import { useAppSelector } from '../../../shared/store';
import { useSearch } from '../../../shared/context/SearchContext';
import { Movie } from '../misc/types';

const NowPlayingContainer: React.FC = () => {
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const { query } = useSearch();

  // Paging state and accumulation
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Fetch current page based on query/category
  const qp = useNowPlaying(page);
  const qs = useSearchMovies(query, page);
  const active = query ? qs : qp;

  // Reset when query changes
  useEffect(() => {
    setPage(1);
    setItems([]);
    setTotalPages(undefined);
  }, [query]);

  // Accumulate results when a page loads
  useEffect(() => {
    const data = active.data;
    if (!data) return;
    setItems(prev => (page === 1 ? data.results : [...prev, ...data.results]));
    setTotalPages(data.total_pages);
  }, [active.data, page]);

  // IntersectionObserver to trigger loading next page
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    // Do not attach observer until we know totalPages to avoid immediate extra loads in tests/polyfills
    if (totalPages === undefined || (totalPages && page >= totalPages)) return;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) return;
      if (active.isLoading || active.isError) return;
      if (totalPages === undefined) return;
      if (page >= totalPages) return;
      setPage(p => p + 1);
    }, { root: null, threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [active.isLoading, active.isError, totalPages, page, query]);

  // Initial loading and error states
  if (active.isLoading && page === 1) return <Loader full />;
  if (active.isError && page === 1) return <ErrorMessage onRetry={active.refetch} message={query ? 'Failed to search movies.' : 'Failed to load now playing.'} />;

  return (
    <div>
      <MovieGrid movies={items} layout={viewMode} />
      {/* Sentinel and small loader for pagination */}
      {totalPages && page >= totalPages ? null : (
        <div ref={sentinelRef} className="loader" aria-hidden>
          {active.isLoading ? <div className="spinner" /> : null}
        </div>
      )}
    </div>
  );
};

export default NowPlayingContainer;
