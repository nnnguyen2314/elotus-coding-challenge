import React, { useCallback } from 'react';
import { useSearch } from '../../../shared/context/SearchContext';

const SearchBar: React.FC<{ placeholder?: string }> = ({ placeholder = 'Search movies...' }) => {
  const { query, setQuery } = useSearch();
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => setQuery(e.target.value), [setQuery]);
  return (
    <div className="search-bar">
      <input className="search-input" value={query} onChange={onChange} placeholder={placeholder} aria-label="Search movies" />
    </div>
  );
};

export default React.memo(SearchBar);
