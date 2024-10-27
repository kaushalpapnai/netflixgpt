import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import GptSearch from "./GptSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies({
    now_playing: "now_playing",
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
  }); // our custome hook which fetch the movies from TMDB api and store it into reudx store
  return (
    <div className="bg-black">
      <Header />
      {!showGptSearch ? 
          <MainContainer />
        : <GptSearch />
      }
    </div>
  );
};

export default Browse;
