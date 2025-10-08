import axios from "axios";

const API_KEY = "1a1af4e9";
const BASE_URL = "https://www.omdbapi.com/";

const omdbApi = axios.create({
  baseURL: BASE_URL,
});

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await omdbApi.get("", {
      params: {
        apikey: API_KEY,
        s: query,
        type: "movie",
        page: page,
      },
    });

    if (response.data.Response === "True") {
      return {
        results: response.data.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          release_date: movie.Year,
          poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
          vote_average: 0,
          overview: "",
        })),
        total_pages: Math.ceil(response.data.totalResults / 10),
        page: page,
      };
    }

    return { results: [], total_pages: 0, page: 1 };
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (imdbId) => {
  try {
    const response = await omdbApi.get("", {
      params: {
        apikey: API_KEY,
        i: imdbId,
        plot: "full",
      },
    });

    if (response.data.Response === "True") {
      const movie = response.data;
      return {
        id: movie.imdbID,
        title: movie.Title,
        overview: movie.Plot,
        release_date: movie.Released,
        runtime: parseInt(movie.Runtime),
        vote_average: parseFloat(movie.imdbRating) || 0,
        poster_path: movie.Poster !== "N/A" ? movie.Poster : null,
        backdrop_path: movie.Poster !== "N/A" ? movie.Poster : null,
        genres: movie.Genre
          ? movie.Genre.split(", ").map((name, index) => ({
              id: index,
              name: name,
            }))
          : [],
        credits: {
          cast: movie.Actors
            ? movie.Actors.split(", ").map((name, index) => ({
                id: index,
                name: name,
                character: "",
                profile_path: null,
              }))
            : [],
        },
        imdbRating: movie.imdbRating,
        imdbVotes: movie.imdbVotes,
        director: movie.Director,
        writer: movie.Writer,
        awards: movie.Awards,
        boxOffice: movie.BoxOffice,
        country: movie.Country,
        language: movie.Language,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getImageUrl = (path) => {
  if (!path || path === "N/A") {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return path;
};

export default omdbApi;
