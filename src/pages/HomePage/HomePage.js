import { Loader } from 'components/Loader/Loader';
import { getTrendingMovies } from 'services/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import css from './HomePage.module.css';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      try {
        const { results } = await getTrendingMovies();
        setMovies(prev => [...prev, ...results]);
      } catch (error) {
        toast.error('Oops! Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className={css.wraper}>
      <h1 className={css.pageTitle}>Trending today</h1>
      {isLoading && <Loader />}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
}
