import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type SearchContextValue = {
  query: string;
  setQuery: (q: string) => void;
};

const Ctx = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('');
  const value = useMemo(() => ({ query, setQuery }), [query]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useSearch = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
};
