import React from 'react';
import '../styles/globals.scss';

const Loader: React.FC<{ full?: boolean }> = ({ full }) => (
  <div className={full ? 'loader loader--full' : 'loader'} aria-busy="true" aria-label="Loading">
    <div className="spinner" />
  </div>
);

export default React.memo(Loader);
