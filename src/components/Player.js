import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMovieTrailer from '../hooks/useMovieTrailer';

const Player = () => {
  const videoId = useSelector((store) => store.player);
  const videoKey = useMovieTrailer(videoId);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading
  const navigate = useNavigate();

  // useEffect to handle error checking and loading state
  useEffect(() => {
    if (videoKey === null) {
      setError(true);
      setLoading(false); // Stop loading if no video key
    } else {
      setError(false); // Reset error if videoKey is valid
      setLoading(false); // Stop loading since video key is ready
    }
  }, [videoKey]); // Dependency array includes videoKey

  const handleBackClick = () => {
    navigate('/browse');
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black">
      {loading ? ( // Show loading animation while loading
        <div className="text-center text-white text-2xl font-semibold">
          Loading...
          {/* Here you can add a spinner or any loading animation */}
        </div>
      ) : !error ? (
        <>
          <button
            onClick={handleBackClick}
            className="absolute top-12 left-4 px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-pink-500 hover:to-yellow-500 shadow-lg rounded-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
          >
            ← Back to Browse
          </button>
          <iframe
            className="w-full h-full aspect-video"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&loop=1&playlist=${videoKey}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </>
      ) : (
        <div className="text-center text-white text-2xl font-semibold">
          Trailer not available for this video.
        </div>
      )}
    </div>
  );
};

export default Player;
