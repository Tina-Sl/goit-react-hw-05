import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetals } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorLoading from "../ErrorLoading/ErrorLoading";
import defaultPhoto from "../../assets/no-photo.jpg";

import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [afterLoading, setAfterLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      try {
        setCast([]);
        setIsLoading(true);
        const dataCredits = await fetchMovieDetals(movieId, "/credits");
        setCast(dataCredits.cast);
        setAfterLoading(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (afterLoading && (!cast || cast?.length === 0)) {
    return <h2 className={s.hhh}>no information about the cast</h2>;
  }

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorLoading />}
      {cast?.length > 0 && (
        <ul className={s.castList}>
          {cast.map((player) => (
            <li className={s.castItem} key={player.id}>
              <img
                className={s.castImg}
                src={
                  player.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${player.profile_path}`
                    : defaultPhoto
                }
                alt={player.name}
              />
              <p className={s.castPlayer}>{player.name}</p>
              {player.character && (
                <p className={s.castTitle}>as {player.character}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
