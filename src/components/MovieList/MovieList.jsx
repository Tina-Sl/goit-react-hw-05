import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import defaultPoster from "../../assets/no-poster.jpg";

import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const genres = JSON.parse(localStorage.getItem("genres"));
  const generMovie = (genre_ids) => {
    let gener = "";
    genre_ids.forEach((elem) => {
      gener = gener + genres.find((gen) => gen.id === elem).name + " ";
    });
    return gener;
  };

  const getYearMovie = (date) => {
    if (!date || isNaN(new Date(date))) {
      return "unk";
    }
    return format(new Date(date), "yyyy");
  };

  const location = useLocation();
  return (
    <ul className={s.moviesList}>
      {movies?.map((movie) => (
        <li key={movie.id} className={s.moviesItem}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div className={s.movieBox}>
              <img
                className={s.moviePoster}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultPoster
                }
                alt="poster"
              />
              <div className={s.movieYear}>
                <p className={s.yearMovie}>
                  {getYearMovie(movie.release_date)}
                </p>
              </div>
            </div>
            <div className={s.boxInfo}>
              <h4 className={s.movieTitle}>{movie.title}</h4>
              <p className={s.propValue}>{generMovie(movie.genre_ids)}</p>
            </div>
          </Link>
          {/* <div className={s.overlay}>
            <p className={s.overlayText}>{movie.overview}</p>
          </div> */}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
