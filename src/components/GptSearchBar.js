import React, { useEffect, useRef } from 'react';
import run from '../utils/gemini';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovies } from '../slices/gptSlice';
import GptMovieSuggestions from './GptMovieSuggestions'; // Import the suggestion component

const GptSearchBar = () => {
 const geminiMovies = useSelector((store) => store.gemini);
 const dispatch = useDispatch();
 const searchText = useRef(null);

 const searchMovieTMDB = async (movie) => {
   const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`, API_OPTIONS);
   const json = await data.json();
   return json.results;
 };

 function handleSearch(e) {
   e.preventDefault();
   const prompt = `Act as a movie recommendation system and suggest five movies for the query: ${searchText.current.value}. Only give movie names, comma-separated like: "Gadar, Sholay, Don, Golmaal, Krishh"`;
   onSent(prompt);
 }

 const onSent = async (prompt) => {
   await run(prompt, dispatch);
 };

 useEffect(() => {
    const fetchData = async () => {
      if (geminiMovies) {
        console.log(geminiMovies);
        const promiseArray = geminiMovies?.map((movie) => searchMovieTMDB(movie));
        const tmdbMovies = await Promise.all(promiseArray);
        console.log(tmdbMovies);
        dispatch(addGptMovies(tmdbMovies));
      }
    };
    
    fetchData(); // Invoke the async function

    // No cleanup needed in this case
  }, [geminiMovies]);

 return (
   <div className="flex  pt-32 justify-center mb-10 space-y-6">
     <form className="flex items-center space-x-2  p-4 rounded-lg ">
       <input
         ref={searchText}
         type="text"
         placeholder="What would you like to watch today..."
         className="p-3 w-80 md:w-96 text-white bg-gray-800 rounded-l-lg focus:outline-none placeholder-gray-400"
       />
       <button
         onClick={handleSearch}
         type="submit"
         className="px-4 py-3 bg-gradient-to-r from-purple-500 to-red-500 text-white font-semibold rounded-r-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
       >
         Search
       </button>
     </form>
   </div>
 );
};

export default GptSearchBar;
