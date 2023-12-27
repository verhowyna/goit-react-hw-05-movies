import { Loader } from 'components/Loader/Loader';
import { MovieCard } from 'components/MovieCard/MovieCard';
import { getTrendingMovies } from 'components/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
    <>
      <h2>Trending today</h2>
      {isLoading && <Loader />}
      <ul>
        {movies.length > 0 &&
          movies.map(movie => {
            return <MovieCard movie={movie} />;
          })}
      </ul>
    </>
  );
}
