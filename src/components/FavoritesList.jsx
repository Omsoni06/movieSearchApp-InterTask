import React from "react";
import MovieCard from "./MovieCard";

const FavoritesList = ({
  favorites,
  onMovieClick,
  onToggleFavorite,
  isFavorite,
}) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-600">Start adding movies to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">
        Your Favorites ({favorites.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={onMovieClick}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
