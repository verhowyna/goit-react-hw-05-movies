import { IoIosPhotos } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';
import css from './MovieCard.module.css';

export const MovieCard = ({ movie: { id, poster_path, title } }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w200';
  const photo = BASE_URL + poster_path;
  const location = useLocation();

  return (
    <li className={css.card} key={id}>
      <NavLink
        className={css.cardLink}
        to={`movies/${id}`}
        state={{ from: location }}
      >
        {poster_path ? <img src={photo} alt={title} /> : <IoIosPhotos />}
        <div className={css.movieName}>{title}</div>
      </NavLink>
    </li>
  );
};
