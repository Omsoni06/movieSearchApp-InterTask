import React from "react";
import { getImageUrl } from "../services/omdbApi";

const MovieCard = ({ movie, onMovieClick, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer">
      <div onClick={() => onMovieClick(movie)} className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        {movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold flex items-center gap-1">
            ⭐ {movie.vote_average?.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {movie.release_date || "N/A"}
        </p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {movie.overview || "No description available."}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
