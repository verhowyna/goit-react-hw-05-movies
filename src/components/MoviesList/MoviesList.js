import { NavLink, useLocation } from 'react-router-dom';
import { IoIosPhotos } from 'react-icons/io';

import css from './MoviesList.module.css';

export const MoviesList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={css.wrap}>
      <ul className={css.moviesList}>
        {movies.length > 0 &&
          movies.map(movie => {
            const { id, title, poster_path } = movie;
            const BASE_URL = 'https://image.tmdb.org/t/p/w200';
            const photo = BASE_URL + poster_path;

            return (
              <li className={css.card} key={id}>
                <NavLink
                  className={css.cardLink}
                  to={`${id}`}
                  state={{ from: location }}
                >
                  {poster_path ? (
                    <img src={photo} alt={title} />
                  ) : (
                    <IoIosPhotos
                      style={{
                        width: '200px',
                        height: '280px',
                        color: '#8080803b',
                      }}
                    />
                  )}
                  <div className={css.movieName}>{title}</div>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
