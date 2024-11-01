import React from 'react'
import MovieCard from './MovieCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addVideoId } from '../slices/playerSlice'

const MovieList = ({title,movies}) => {
  // console.log(movies)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleCardClick = (movieId) => {
    dispatch(addVideoId(movieId))
    navigate(`/player`);
  };
  return (
    <div className='px-6'>
        <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl  py-4 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
            <div className='flex'>
                {movies?.map((movie)=>{
                  return  <MovieCard key={movie?.id} posterKey={movie?.poster_path} onClick={()=>handleCardClick(movie?.id)}/> 
                })}
            </div>
        </div>
    </div>
  )
}

export default MovieList
