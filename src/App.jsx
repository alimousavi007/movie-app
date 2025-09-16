import { useEffect, useState } from "react";
import "./index.css";
import { MovieCard } from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("Batman");

  // IMPORTANT: Replace this with your own API key!
  const API_KEY = "268c45d0";

  useEffect(() => {
    // Reset state for each new search
    setIsLoading(true);
    setError(null);

    // Don't fetch if the search term is empty
    if (!searchTerm.trim()) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    async function fetchMovies() {
      try {
        const response = await fetch(
          `https://omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]); // Clear previous results on error
          setError(data.Error);
        }
      } catch (err) {
        setError("An error occurred while connecting to the server.");
      } finally {
        setIsLoading(false); // This runs whether it succeeds or fails
      }
    }

    fetchMovies();
  }, [searchTerm]); // Re-run this effect whenever searchTerm changes

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(query);
  };

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Movie Search 🎬
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 mb-8 max-w-xl mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a movie title..."
            className="flex-grow p-3 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="content">
          {isLoading && (
            <h3 className="text-center text-slate-400">Loading...</h3>
          )}
          {error && (
            <h3 className="text-center text-red-500">Error: {error}</h3>
          )}

          {!isLoading && !error && movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}/>

              ))}
            </div>
          )}

          {!isLoading && !error && movies.length === 0 && searchTerm && (
            <h3 className="text-center text-slate-400">
              No movies found for "{searchTerm}". Please try another search.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
