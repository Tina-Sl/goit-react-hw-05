import { useEffect } from "react";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovie } from "../../services/api";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorLoading from "../../components/ErrorLoading/ErrorLoading.jsx";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) {
      setSearchParams({});
      setMovies([]);
      return;
    }
    setSearchParams({ query: newQuery, page: 1 });
  };

  useEffect(() => {
    const getMovies = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        const moviesData = await fetchSearchMovie(query);
        setMovies(moviesData);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [query]);

  return (
    <div>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorLoading />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
