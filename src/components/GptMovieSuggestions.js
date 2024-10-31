import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const movieNames = useSelector((store) => store.gemini);
  const movieResults = useSelector((store) => store.gpt.gptMovies);

  if (!movieNames || !movieResults || movieNames.length !== movieResults.length) {
    return null;
  }

  return (
    <div className="suggestions-container text-white bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg shadow-lg mt-4">
      <h2 className="suggestions-title text-xl font-semibold mb-4 text-center text-gray-100">Movie Suggestions</h2>
      <div className="movie-lists grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movieNames.map((movieName, index) => (
          <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
