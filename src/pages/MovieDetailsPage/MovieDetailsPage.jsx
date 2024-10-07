import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState, useRef, Suspense } from "react";
import { fetchMovieDetals } from "../../services/api";
import defaultImages from "../../assets/no-images.jpg";
import clsx from "clsx";
import s from "./MovieDetailsPage.module.css";
import ErrorLoading from "../../components/ErrorLoading/ErrorLoading.jsx";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkURL = useRef(location.state ?? "/movies");
  const buildLinkClass = (to) => {
    return clsx(s.btnLink, location.pathname === to && s.btnLinkActive);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovieDetals(movieId);
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div className={s.mainContainer}>
      {isLoading && <Loader />}
      {isError && <ErrorLoading />}
      <NavLink to={backLinkURL.current} className={s.backBtn}>
        &larr; back
      </NavLink>
      {movie && (
        <div className={s.movieContainer}>
          <div className={s.boxTitle}>
            <h2 className={s.movieTitle}>{movie.title}</h2>
          </div>
          <div className={s.movieCard}>
            <img
              className={s.movieBackdrop}
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                  : defaultImages
              }
              alt={movie.title}
            />
            <div className={s.movieInfo}>
              <div className={s.movieGenresBox}>
                <span className={s.movieGenres}>Geners:&nbsp; </span>
                {movie.genres?.length > 0 ? (
                  <span className={s.movieGenresInfo}>
                    {movie.genres.map((genre) => genre.name).join(", ")}
                  </span>
                ) : (
                  <span className={s.movieGenresInfo}>unknown</span>
                )}
              </div>
              <div className={s.movieContent}>
                <p>{movie.overview}</p>
              </div>
              <div className={s.moviePropBox}>
                <p>
                  Country:&nbsp;
                  {movie.production_countries?.length > 0 ? (
                    <span className={s.moviePropText}>
                      {movie.production_countries
                        .map((country) => country.name)
                        .join(", ")}
                    </span>
                  ) : (
                    <span className={s.movieCountryText}>unknown</span>
                  )}
                </p>
              </div>
              <div className={s.moviePropBox}>
                <p>
                  Rating:&nbsp;
                  {movie.vote_average ? (
                    <span className={s.moviePropText}>
                      {movie.vote_average.toFixed(1)}
                    </span>
                  ) : (
                    <span className={s.moviePropText}>unknown</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <hr></hr>
          <h3 className={s.detailsTitle}>Additional information</h3>
          <nav className={s.detailsInfo}>
            <NavLink
              className={buildLinkClass(`/movies/${movieId}/cast`)}
              to={"cast"}
              state={location.state}
            >
              Cast
            </NavLink>
            <NavLink
              className={buildLinkClass(`/movies/${movieId}/reviews`)}
              to={"reviews"}
              state={location.state}
            >
              Reviews
            </NavLink>
          </nav>

          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
