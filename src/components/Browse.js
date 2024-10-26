
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer'


const Browse = () => {
  
   useNowPlayingMovies({now_playing:"now_playing",popular:"popular",top_rated:"top_rated",upcoming:"upcoming"})  // our custome hook which fetch the movies from TMDB api and store it into reudx store 
  return (
    <div className='bg-black'>
      <Header/> 
      <MainContainer/>
    </div>
  )
}

export default Browse
