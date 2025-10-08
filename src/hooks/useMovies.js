import { useState, useEffect } from "react";
import { searchMovies } from "../services/omdbApi";

export const useMovies = (searchQuery = "") => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) {
        setMovies([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await searchMovies(searchQuery, page);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 100));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  return {
    movies,
    loading,
    error,
    page,
    setPage,
    totalPages,
  };
};
