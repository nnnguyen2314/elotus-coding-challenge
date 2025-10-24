import React, { useState } from 'react';
import { getImageUrl } from '../utils/config';

type Props = {
  path?: string | null;
  alt: string;
  size?: 'w92'|'w200'|'w300'|'w500'|'original';
  className?: string;
};

const ImageWithFade: React.FC<Props> = ({ path, alt, size = 'w300', className }) => {
  const [loaded, setLoaded] = useState(false);
  const src = getImageUrl(path, size);
  if (!src) return <div className={`img-placeholder ${className || ''}`} aria-label={alt} />;
  return (
    <img src={src} alt={alt} className={`fade-image ${loaded ? 'is-loaded' : ''} ${className || ''}`} loading="lazy" onLoad={() => setLoaded(true)} />
  );
};

export default React.memo(ImageWithFade);
