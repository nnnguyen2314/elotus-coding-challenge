import React, { useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NowPlayingContainer from './features/movies/containers/NowPlayingContainer';
import TopRatedContainer from './features/movies/containers/TopRatedContainer';
import MovieDetailsContainer from './features/movies/containers/MovieDetailsContainer';
import TabBar from './features/movies/components/TabBar';
import SearchBar from './features/movies/components/SearchBar';
import SegmentedToggle from './features/movies/components/SegmentedToggle';
import { useAppDispatch, useAppSelector } from './shared/store';
import { setViewMode, toggleTheme } from './shared/store/uiSlice';
import './shared/styles/globals.scss';

function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const theme = useAppSelector(s => s.ui.theme);
  const onChange = useCallback((v: 'grid'|'list') => dispatch(setViewMode(v)), [dispatch]);
  const onToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const showSearch = location.pathname === '/' || location.pathname.startsWith('/top-rated');
  return (
    <header className="app-header">
      <div className="header-flex">
        <div className="header-left">
          <h1 className="app-title">Movie Listing</h1>
          <TabBar />
        </div>
        <div className="header-right">
          <SegmentedToggle value={viewMode} onChange={onChange} />
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
      {showSearch && <SearchBar />}
    </header>
  );
}

function App() {
  const theme = useAppSelector(s => s.ui.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<NowPlayingContainer />} />
          <Route path="/top-rated" element={<TopRatedContainer />} />
          <Route path="/movie/:id" element={<MovieDetailsContainer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
