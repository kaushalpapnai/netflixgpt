import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryMovies = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="-mt-52 z-20 relative">
      <div className="">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryMovies;
