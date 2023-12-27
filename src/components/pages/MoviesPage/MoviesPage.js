import { Loader } from 'components/Loader/Loader';
import { searchMovies } from 'components/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const [params, setParams] = useSearchParams();
  const searchedMovie = params.get('movie') ?? '';

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        if (!searchedMovie) {
          return;
        }
        const { results } = await searchMovies(searchedMovie);
        if (!results) {
          return;
        }
        setMovies(results);
      } catch (error) {
        toast.error('Oops! Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [searchedMovie]);

  const location = useLocation();

  const onSearch = evt => {
    evt.preventDefault();

    const { value } = evt.target.elements.movie;
    if (value) {
      setParams({ movie: value });
    }
  };

  return (
    <>
      <form onSubmit={onSearch}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search movie"
          name="movie"
        />
        <button type="button">Search</button>
      </form>
      {isLoading && <Loader />}
      <div>
        <ul>
          {movies.length > 0 &&
            movies.map(movie => {
              const { id, title, poster_path } = movie;
              const BASE_URL = 'https://image.tmdb.org/t/p/w200';
              const photo = BASE_URL + poster_path;

              return (
                <li key={id}>
                  <NavLink to={`${id}`} state={{ from: location }}>
                    {poster_path ? (
                      <img src={photo} alt={title} />
                    ) : (
                      <div>No Poster</div>
                    )}
                    <h3>{title}</h3>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </div>
      {movies.length === 0 && !isLoading && searchedMovie && (
        <div>Movie "{searchedMovie}" not found.</div>
      )}
    </>
  );
}