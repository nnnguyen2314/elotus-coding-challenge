export const config = {
  tmdbBaseUrl: process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  // Bearer access token for TMDB API v4
  tmdbAccessToken: process.env.REACT_APP_TMDB_ACCESS_TOKEN || '',
  imageBaseUrl: process.env.REACT_APP_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
};

export const getImageUrl = (path?: string | null, size: 'w92'|'w200'|'w300'|'w500'|'original' = 'w300') => {
  if (!path) return '';
  return `${config.imageBaseUrl}/${size}${path}`;
};
