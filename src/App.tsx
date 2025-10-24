import React, { useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NowPlayingContainer from './features/movies/containers/NowPlayingContainer';
import TopRatedContainer from './features/movies/containers/TopRatedContainer';
import MovieDetailsContainer from './features/movies/containers/MovieDetailsContainer';
import TabBar from './features/movies/components/TabBar';
import SearchBar from './features/movies/components/SearchBar';
import SegmentedToggle from './features/movies/components/SegmentedToggle';
import { useAppDispatch, useAppSelector } from './shared/store';
import { setViewMode } from './shared/store/uiSlice';
import './shared/styles/globals.scss';

function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const onChange = useCallback((v: 'grid'|'list') => dispatch(setViewMode(v)), [dispatch]);
  const showSearch = location.pathname === '/' || location.pathname.startsWith('/top-rated');
  return (
    <header className="app-header">
      <div className="header-flex">
        <TabBar />
        <SegmentedToggle value={viewMode} onChange={onChange} />
      </div>
      {showSearch && <SearchBar />}
    </header>
  );
}

function App() {
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
