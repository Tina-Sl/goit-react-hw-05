import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import { fetchTrendingMovies, getGenres } from "../../services/api";
import s from "./HomePage.module.css";

import { useEffect, useState } from "react";
import ErrorLoading from "../../components/ErrorLoading/ErrorLoading";

const HomePage = () => {
  getGenres();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
        setIsLoading(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <div className={s.titleBox}>
        <h1 className={s.title}>Trending today</h1>
      </div>
      {isLoading && <Loader />}
      {isError && <ErrorLoading />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
