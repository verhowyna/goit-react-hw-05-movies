import { Loader } from 'components/Loader/Loader';
import { getTrendingMovies } from 'components/api';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const { results } = await getTrendingMovies();
        setMovies(prev => [...prev, ...results]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const location = useLocation();

  return (
    <>
      <h2>Trending today</h2>

      {error && <div>Oops, something went wrong.</div>}
      {isLoading && <Loader />}

      <ul>
        {movies.length > 0 &&
          movies.map((movie, index) => {
            const { id, original_title, poster_path } = movie;
            const BASE_URL = 'https://image.tmdb.org/t/p/w200';
            const photo = BASE_URL + poster_path;

            return (
              <li key={index}>
                <NavLink to={`movies/${id}`} state={{ from: location }}>
                  {poster_path ? (
                    <img src={photo} alt={original_title} />
                  ) : (
                    <div>No Poster</div>
                  )}
                  <h3>{original_title}</h3>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </>
  );
}
