import { Loader } from 'components/Loader/Loader';
import { getCast } from 'components/api';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { IoIosPhotos } from 'react-icons/io';
import css from './Cast.module.css';

export const Cast = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const { cast } = await getCast(movieId);
        setCast([...cast]);
      } catch (error) {
        toast.error('Oops! Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {cast.length > 0 && (
        <div className={css.wraper}>
          <ul className={css.actorsList}>
            {cast.map(actor => {
              const { profile_path, name, character } = actor;
              const BASE_URL = 'https://image.tmdb.org/t/p/w200';
              const photo = BASE_URL + profile_path;
              return (
                <li className={css.actorsCard} key={name}>
                  {profile_path ? (
                    <img src={photo} alt={name} />
                  ) : (
                    <IoIosPhotos
                      style={{
                        width: '200px',
                        height: '280px',
                        color: '#8080803b',
                      }}
                    />
                  )}
                  <div className={css.cardText}>
                    <p className={css.text}>{name}</p>
                    <p className={css.text}>Character: {character}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
