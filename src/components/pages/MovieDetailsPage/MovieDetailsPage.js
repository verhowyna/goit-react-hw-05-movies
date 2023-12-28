import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLink = useRef(location);

  return (
    <>
      <NavLink to={backLink.current.state?.from ?? '/movies'}>
        <button className={css.backBtn} type="button">
          Go back
        </button>
      </NavLink>

      <MovieDetails />

      <div className={css.wraper}>
        <h3>Additional information:</h3>

        <ul className={css.informationList}>
          <li>
            <NavLink className={css.informationLink} to="cast">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink className={css.informationLink} to="reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
}
