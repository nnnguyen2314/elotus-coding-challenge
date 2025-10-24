import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../misc/types';
import ImageWithFade from '../../../shared/components/ImageWithFade';

const MovieTable: React.FC<{ movies: Movie[] }>= ({ movies }) => {
  return (
    <div className="movie-table-wrap">
      <table className="movie-table" role="table" aria-label="Movies list">
        <thead>
          <tr>
            <th scope="col" style={{width: 92}}>Thumbnail</th>
            <th scope="col">Title</th>
            <th scope="col" style={{width: 120}}>Year</th>
            <th scope="col" style={{width: 100}}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(m => {
            const year = m.release_date ? new Date(m.release_date).getFullYear() : '';
            const rating = (m.vote_average ?? 0).toFixed(1);
            return (
              <tr key={m.id}>
                <td>
                  <div className="thumb">
                    <ImageWithFade path={m.poster_path} alt={m.title} size="w92" />
                  </div>
                </td>
                <td>
                  <Link to={`/movie/${m.id}`}>{m.title}</Link>
                </td>
                <td>{year}</td>
                <td>⭐ {rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MovieTable);
