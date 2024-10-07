import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "417441658020ce2169036da8fa654c58";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTc0NDE2NTgwMjBjZTIxNjkwMzZkYThmYTY1NGM1OCIsIm5iZiI6MTcyNzY5MTQ4Ny40NzkwMjksInN1YiI6IjY2ZmE3NjI4NjA2YjU5NWQ5ZmQwMDZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o96wnxAbP-5AKoz3oEw67k9DubpUVwShhp7BjcqgECM";

const PARAMS = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const respons = await axios.get(`trending/movie/day`, PARAMS);
  return respons.data.results;
};

export const fetchMovieDetals = async (movieId, urlParam = "") => {
  const respons = await axios.get(`/movie/${movieId}${urlParam}`, PARAMS);
  return respons.data;
};

export const fetchSearchMovie = async (query, page = 1) => {
  const paramsSerch = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      query,
      page,
    },
  };
  const respons = await axios.get(`/search/movie`, paramsSerch);
  return respons.data.results;
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`/genre/movie/list?api_key=${API_KEY}`);
    localStorage.setItem("genres", JSON.stringify(response.data.genres));
  } catch (error) {
    console.error("Failed to fetch movies by query", error);
    throw error;
  }
};
