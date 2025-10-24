import React from 'react';
import { NavLink } from 'react-router-dom';

const TabBar: React.FC = () => (
  <div className="app-tabs" role="tablist" aria-label="Movies categories">
    <NavLink to="/" end className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}>Now Playing</NavLink>
    <NavLink to="/top-rated" className={({ isActive }) => `tab-link ${isActive ? 'active' : ''}`}>Top Rated</NavLink>
  </div>
);

export default React.memo(TabBar);
