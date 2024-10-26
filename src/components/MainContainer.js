import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import SecondaryMovies from './SecondaryMovies';

const MainContainer = () => {
    const movies = useSelector((store)=>store.movies?.nowPlayingMovies)
    if (!movies) return;  // we are doing early return because if the movies is null and we try to use it so it will throw an error
    
    const mainMovie = movies[0]
    const {original_title,overview , id} = mainMovie;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview } />
      <VideoBackground videoId={id}/>
      <SecondaryMovies/>
    </div>
  )
}

export default MainContainer
