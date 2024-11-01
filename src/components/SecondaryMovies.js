import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryMovies = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="relative px-4 md:px-8 lg:px-16 mt-4 lg:-mt-24 xl:-mt-36 2xl:-mt-48">
      <div className="space-y-8">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryMovies;
