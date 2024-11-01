import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (videoId) => {
  const [videoKey, setVideoKey] = useState(null);

  const getVideoMovie = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${videoId}/videos?language=en-US`,
        API_OPTIONS
      );

      // Check for response status
      if (!data.ok) {
        console.error('Failed to fetch videos:', data.statusText);
        setVideoKey(null); // Set to null in case of an error
        return; // Exit early if the fetch fails
      }

      const json = await data.json();


      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length > 0 ? filterData[0] : json.results[0]; // Check if filtered data is empty

      // Ensure trailer is defined before accessing the key
      if (trailer && trailer.key) {
        setVideoKey(trailer.key);
      } else {
        setVideoKey(null); // Reset videoKey if no valid trailer key found
      }
    } catch (error) {
      console.error('Error fetching video:', error);
      setVideoKey(null); // Handle any errors by resetting videoKey
    }
  };

  useEffect(() => {
    if (videoId) {
      getVideoMovie();
    }
  }, [videoId]);

  return videoKey;
};

export default useMovieTrailer;
