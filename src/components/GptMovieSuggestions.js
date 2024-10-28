import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const movieNames = useSelector((store) => store.gemini);
  const movieResults = useSelector((store) => store.gpt.gptMovies);

  if (!movieNames || !movieResults || movieNames.length !== movieResults.length) {
    return null;
  }

  // console.log(movieNames[0])

  return (
    <>
      <div className="text-white bg-black ">
        {console.log(movieNames)}
        {
         movieNames.map((movieName,index )=><MovieList key={movieName} title={movieName} movies={movieResults[index]} />)
        }
      </div>
    </>
  );
};

export default GptMovieSuggestions;
