import { Loader } from 'components/Loader/Loader';
import { getReviews } from 'components/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export const Reviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { results } = await getReviews(movieId);
        setReviews([...results]);
      } catch (error) {
        toast.error('Oops! Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {reviews.length > 0 && (
        <div>
          <ul
            style={{
              listStyle: 'none',
            }}
          >
            {reviews.map(review => {
              const { author, content } = review;
              return (
                <li key={author}>
                  <h3>{author}</h3>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {reviews.length === 0 && !isLoading && (
        <div>We don't have any reviews for this movie yet.</div>
      )}
    </>
  );
};
