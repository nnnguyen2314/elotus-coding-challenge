export const config = {
  tmdbBaseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  // Bearer access token for TMDB API v4
  tmdbAccessToken: process.env.TMDB_ACCESS_TOKEN || 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmY0ZTI1NDJiOTRmNzk0NTY2MTRmMmM3MTY3ZTM5MSIsIm5iZiI6MTc2MTMxODg3MC44MzcsInN1YiI6IjY4ZmI5N2Q2ZWM2OWYzMTg0ODA5NDgyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zrx5esiGl5-DjwVeRKkzEQ7qJQXYClC6q-H7Vr0R2l0',
  imageBaseUrl: process.env.TMDB_MOVIE_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
};

export const getImageUrl = (path?: string | null, size: 'w92'|'w200'|'w300'|'w500'|'original' = 'w300') => {
  if (!path) return '';
  return `${config.imageBaseUrl}/${size}${path}`;
};
