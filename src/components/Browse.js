
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer'


const Browse = () => {
  
  useNowPlayingMovies()  // our custome hook which fetch the movies from TMDB api and store it into reudx store 

  return (
    <div>
      <Header/> 
      <MainContainer/>
    </div>
  )
}

export default Browse
