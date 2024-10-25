import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ videoId }) => {
  
    const videoKey = useMovieTrailer(videoId)

  return (
    <div className="w">
      <iframe
        className="w-screen aspect-video"
        src= {`https://www.youtube.com/embed/${videoKey}?&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
