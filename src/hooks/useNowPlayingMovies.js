import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMoives } from '../slices/movieSlice'
import { useEffect } from 'react'

const useNowPlayingMovies = ({now_playing,popular,top_rated,upcoming})=>{
    const dispatch = useDispatch()

    const getNowPlayingMovies = async ()=>{
      const data = await fetch(`https://api.themoviedb.org/3/movie/${now_playing}?page=1`, API_OPTIONS )
      const json = await data.json()
      dispatch(addNowPlayingMovies(json?.results)) 
      
    }
    const getPopularMovies = async ()=>{
     const data = await fetch(`https://api.themoviedb.org/3/movie/${popular}?page=1`, API_OPTIONS )
     const json = await data.json()
     dispatch(addPopularMovies(json?.results)) 
     
   }
   const getTopRatedMovies = async ()=>{
     const data = await fetch(`https://api.themoviedb.org/3/movie/${top_rated}?page=1`, API_OPTIONS )
     const json = await data.json()
     dispatch(addTopRatedMovies(json?.results)) 
     
   }
   const getUpcomingMovies = async ()=>{
     const data = await fetch(`https://api.themoviedb.org/3/movie/${upcoming}?page=1`, API_OPTIONS )
     const json = await data.json()
     dispatch(addUpcomingMoives(json?.results)) 
     
   }
  
     useEffect(()=>{
          getNowPlayingMovies()
          getPopularMovies()
          getTopRatedMovies()
          getUpcomingMovies()
     },[])
}

export default useNowPlayingMovies