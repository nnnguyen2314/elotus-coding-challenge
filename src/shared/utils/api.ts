import { config } from './config';

export type TMDBListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export const tmdbFetch = async <T>(path: string, params: Record<string, any> = {}): Promise<T> => {
  const url = new URL(`${config.tmdbBaseUrl}${path}`);
  // Do not use query api_key; use Bearer token header instead
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.append(k, String(v));
  });

  const headers: Record<string, string> = { 'Accept': 'application/json' };
  if (config.tmdbAccessToken) {
    headers['Authorization'] = `Bearer ${config.tmdbAccessToken}`;
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB API error ${res.status}: ${text}`);
  }
  return res.json();
};
