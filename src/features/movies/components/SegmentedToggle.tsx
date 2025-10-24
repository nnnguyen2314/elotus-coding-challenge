import React from 'react';

const SegmentedToggle: React.FC<{ value: 'grid'|'list'; onChange: (v: 'grid'|'list') => void }> = ({ value, onChange }) => (
  <div className="segmented" role="tablist" aria-label="View mode">
    <button role="tab" className={value==='grid'? 'active': ''} onClick={() => onChange('grid')} aria-selected={value==='grid'}>Grid</button>
    <button role="tab" className={value==='list'? 'active': ''} onClick={() => onChange('list')} aria-selected={value==='list'}>List</button>
  </div>
);

export default React.memo(SegmentedToggle);
