import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (videoId) => {
  const [videoKey, setVideoKey] = useState(null);
  const getVideoMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${videoId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type == "Trailer");
    const trailer = filterData.lenght ? filterData[0] : json.results[0]; // we are actually checking if the fileter data is empty then simply play any video from json.results
    setVideoKey(trailer.key);
  };

  useEffect(() => {
    getVideoMovie();
  }, []);
  return videoKey;
};

export default useMovieTrailer;
