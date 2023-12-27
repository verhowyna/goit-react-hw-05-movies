import { NavLink, useLocation } from 'react-router-dom';

export const MovieCard = ({ movie: { id, poster_path, title } }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w300';
  const photo = BASE_URL + poster_path;
  const location = useLocation();

  return (
    <li key={id}>
      <NavLink to={`movies/${id}`} state={{ from: location }}>
        {poster_path ? <img src={photo} alt={title} /> : <div>No Poster</div>}
        <h3>{title}</h3>
      </NavLink>
    </li>
  );
};
