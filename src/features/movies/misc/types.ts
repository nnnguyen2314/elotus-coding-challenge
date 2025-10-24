export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

export type MovieDetails = Movie & {
  runtime?: number;
  genres?: { id: number; name: string }[];
  homepage?: string | null;
};
