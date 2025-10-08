import React from "react";

const Navbar = ({ onViewChange, currentView, favoritesCount }) => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🎬</span>
              MovieFlix
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onViewChange("home")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === "home"
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange("favorites")}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                currentView === "favorites"
                  ? "bg-white text-purple-600"
                  : "text-white hover:bg-white/20"
              }`}
            >
              ❤️ Favorites
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
