import { Loader } from 'components/Loader/Loader';
import { searchMovies } from 'services/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdSearch } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import css from './MoviePage.module.css';
import { MoviesList } from 'components/MoviesList/MoviesList';

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

  const onSearch = evt => {
    evt.preventDefault();
    const { value } = evt.target.elements.movie;
    if (value) {
      setParams({ movie: value });
      evt.target.reset();
    }
  };

  return (
    <>
      <form className={css.inputWrap} onSubmit={onSearch}>
        <input
          className={css.inputField}
          type="text"
          autoComplete="off"
          placeholder="Search movie"
          name="movie"
        />
        <button className={css.searchBtn} type="submit">
          <IoMdSearch size="24" />
        </button>
      </form>
      {isLoading && <Loader />}

      {movies.length > 0 && !isLoading && <MoviesList movies={movies} />}

      {movies.length === 0 && !isLoading && searchedMovie && (
        <div className={css.warning}>
          Movie "{searchedMovie}" not found. Please try again.
        </div>
      )}
    </>
  );
}
