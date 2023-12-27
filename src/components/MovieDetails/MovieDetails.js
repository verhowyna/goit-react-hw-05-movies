import { Loader } from 'components/Loader/Loader';
import { getDetails } from 'components/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();

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

  const getAverage = () => {
    const { vote_average } = movie;
    return Math.round(vote_average * 10);
  };

  const makeImgURL = () => {
    const { poster_path } = movie;
    const BASE_URL = 'https://image.tmdb.org/t/p/w300';
    return BASE_URL + poster_path;
  };

  return (
    <>
      {isLoading && <Loader />}
      {movie && (
        <div>
          <div>
            <img src={makeImgURL()} alt={movie.title}></img>
            <div>
              <h2>{movie.title}</h2>
              <p>User score: {getAverage()}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(({ name, id }) => (
                  <li key={id}>{name} </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
