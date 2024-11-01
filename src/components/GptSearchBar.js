import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import run from '../utils/gemini';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovies } from '../slices/gptSlice';
import { addSearchMovieLoading } from "../slices/loadingSlice";
import { setError } from '../slices/geminiSlice';
import GptMovieSuggestions from './GptMovieSuggestions';

const GptSearchBar = () => {
  const geminiMovies = useSelector((store) => store.gemini.movies);
  const loading = useSelector((store) => store.loading.searchMovieLoading);
  const errorMessage = useSelector((store) => store.gemini.error);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`, API_OPTIONS);
    const json = await data.json();
    return json.results;
  };

  function handleSearch(e) {
    e.preventDefault();
    const query = searchText.current.value;
    if (!query) {
      dispatch(setError('Please enter a search term.'));
      return;
    }

    const prompt = `Act as a movie recommendation system and suggest five movies for the query: ${query}. Only give movie names, comma-separated like: "Gadar, Sholay, Don, Golmaal, Krishh"`;
    onSent(prompt);
    setSearchInitiated(true);
  }

  const onSent = async (prompt) => {
    await run(prompt, dispatch);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchInitiated && geminiMovies && geminiMovies.length > 0) {
        dispatch(addSearchMovieLoading(true));
        const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbMovies = await Promise.all(promiseArray);
        dispatch(addGptMovies(tmdbMovies));
        dispatch(addSearchMovieLoading(false));

        // If no movies were found, set an error message
        if (tmdbMovies.every(movies => movies.length === 0)) {
          dispatch(setError('No movies found. Please try again.'));
        }

        // Reset searchInitiated after the search completes
        setSearchInitiated(false);
      }
    };

    fetchData();
  }, [geminiMovies, dispatch, searchInitiated]);

  return (
    <div className="flex flex-col items-center pt-20 sm:pt-32 px-4 mb-10 space-y-6 w-full">
      <form className="flex flex-col sm:flex-row items-center w-full max-w-lg space-y-4 sm:space-y-0 sm:space-x-2 p-4 rounded-lg">
        <input
          ref={searchText}
          type="text"
          placeholder="What would you like to watch today..."
          className="p-3 w-full sm:w-80 md:w-96 text-white bg-gray-800 rounded-lg sm:rounded-l-lg focus:outline-none placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          type="submit"
          className="px-4 py-3 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-red-500 text-white font-semibold rounded-lg sm:rounded-r-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
        >
          Search
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div>
      )}
      {searchInitiated && !loading && <GptMovieSuggestions />}
    </div>
  );
};

export default GptSearchBar;
