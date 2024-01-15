import { MovieDetails } from 'components/MovieDetails/MovieDetails';
import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import toast from 'react-hot-toast';
import { getDetails } from 'services/api';
import { Loader } from 'components/Loader/Loader';

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();
  const backLink = useRef(location);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getDetails(movieId);
        setMovie({ ...response });
      } catch (error) {
        toast.error('Oops! Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  return (
    <div>
      <NavLink to={backLink.current.state?.from ?? '/movies'}>
        <button className={css.backBtn} type="button">
          Go back
        </button>
      </NavLink>
      {isLoading && <Loader />}
      {movie && <MovieDetails movie={movie} />}

      <div className={css.wraper}>
        <h3>Additional information:</h3>

        <div className={css.informationList}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
