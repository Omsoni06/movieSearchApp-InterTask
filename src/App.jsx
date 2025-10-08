import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import FavoritesList from "./components/FavoritesList";
import { useMovies } from "./hooks/useMovies";
import { useFavorites } from "./hooks/useFavorites";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentView, setCurrentView] = useState("home");

  const { movies, loading, error, page, setPage, totalPages } =
    useMovies(searchQuery);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setCurrentView("home");
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onViewChange={handleViewChange}
        currentView={currentView}
        favoritesCount={favorites.length}
      />

      {currentView === "home" ? (
        <>
          <SearchBar onSearch={handleSearch} />

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Welcome screen when no search query */}
            {!searchQuery && !loading && movies.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎬</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Welcome to MovieFlix
                </h2>
                <p className="text-xl text-gray-600 mb-2">
                  Search for your favorite movies above!
                </p>
                <p className="text-gray-500">
                  Try searching: "Avengers", "Inception", "Batman", "Titanic",
                  etc.
                </p>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🎬</div>
                <p className="text-xl text-gray-600">Loading movies...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">❌</div>
                <p className="text-xl text-red-600">Error: {error}</p>
              </div>
            )}

            {/* No results found */}
            {!loading && !error && searchQuery && movies.length === 0 && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-xl text-gray-600">
                  No movies found for "{searchQuery}"
                </p>
                <p className="text-gray-500 mt-2">
                  Try a different search term
                </p>
              </div>
            )}

            {/* Movies grid */}
            {!loading && !error && movies.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Search Results for "{searchQuery}"
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onMovieClick={handleMovieClick}
                      isFavorite={isFavorite(movie.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-700 font-medium">
                      Page {page} of {Math.min(totalPages, 100)}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <FavoritesList
          favorites={favorites}
          onMovieClick={handleMovieClick}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}

      {selectedMovie && (
        <MovieDetails
          movieId={selectedMovie.id}
          onClose={handleCloseDetails}
          isFavorite={isFavorite(selectedMovie.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export default App;
