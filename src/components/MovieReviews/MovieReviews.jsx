import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetals } from "../../services/api";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import ErrorLoading from "../ErrorLoading/ErrorLoading";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setReviews([]);
        const data = await fetchMovieDetals(movieId, "/reviews");
        setReviews(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

   if (!reviews || reviews?.length === 0) {
    return <h2 className={s.hhh}>no reviews for this movie</h2>;
  }

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorLoading />}
      {reviews && (
        <ul className={s.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={s.reviewItem}>
              <h3 className={s.reviewAuthor}>{review.author}</h3>
              <div className={s.review}>
                {review.content?.length > 344 && (
                  <input
                    type="button"
                    value="read the whole text"
                    className={s.btnShow}
                  ></input>
                )}
                <p className={s.reviewContent}>{review.content}</p>
                {review.content?.length > 344 && (
                  <input
                    type="button"
                    value="hide part of the text"
                    className={s.btnHide}
                  ></input>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
