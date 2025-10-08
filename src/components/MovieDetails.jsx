import React, { useState, useEffect } from "react";
import { getMovieDetails, getImageUrl } from "../services/omdbApi";

const MovieDetails = ({ movieId, onClose, isFavorite, onToggleFavorite }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto z-50">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white text-black p-2 rounded-full hover:bg-gray-200 z-10 text-2xl w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>

          <div className="relative">
            <img
              src={getImageUrl(movie.backdrop_path)}
              alt={movie.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-64 rounded-lg shadow-lg"
              />

              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                <div className="flex items-center gap-4 mb-4">
                  {movie.vote_average > 0 && (
                    <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                      ⭐ {movie.vote_average?.toFixed(1)}
                    </span>
                  )}
                  <span className="text-gray-600">
                    {movie.release_date || "N/A"}
                  </span>
                  {movie.runtime && (
                    <span className="text-gray-600">{movie.runtime} min</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onToggleFavorite(movie)}
                  className={`mb-6 py-3 px-6 rounded-lg font-medium transition-all ${
                    isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {isFavorite
                    ? "❤️ Remove from Favorites"
                    : "🤍 Add to Favorites"}
                </button>

                <div className="mb-6 space-y-2">
                  {movie.director && movie.director !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>Director:</strong> {movie.director}
                    </p>
                  )}

                  {movie.writer && movie.writer !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>Writer:</strong> {movie.writer}
                    </p>
                  )}

                  {movie.imdbRating && movie.imdbRating !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>IMDb Rating:</strong> {movie.imdbRating}/10
                      {movie.imdbVotes &&
                        movie.imdbVotes !== "N/A" &&
                        ` (${movie.imdbVotes} votes)`}
                    </p>
                  )}

                  {movie.awards && movie.awards !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>Awards:</strong> {movie.awards}
                    </p>
                  )}

                  {movie.boxOffice && movie.boxOffice !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>Box Office:</strong> {movie.boxOffice}
                    </p>
                  )}

                  {movie.country && movie.country !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>Country:</strong> {movie.country}
                    </p>
                  )}

                  {movie.language && movie.language !== "N/A" && (
                    <p className="text-gray-700">
                      <strong>Language:</strong> {movie.language}
                    </p>
                  )}
                </div>

                <h2 className="text-2xl font-bold mb-3">Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {movie.overview || "No overview available."}
                </p>

                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Cast</h2>
                    <div className="flex flex-wrap gap-3">
                      {movie.credits.cast.map((actor, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm"
                        >
                          {actor.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
