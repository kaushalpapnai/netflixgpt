import React from 'react';

const GptSearchBar = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex items-center space-x-2 bg-black bg-opacity-70 p-4 rounded-lg shadow-md relative -mt-96">
        <input
          type="text"
          placeholder="What would you like to watch today..."
          className="p-3 w-80 md:w-96 text-white bg-gray-800 rounded-l-lg focus:outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-gradient-to-r from-purple-500 to-red-500 text-white font-semibold rounded-r-lg hover:from-pink-500 hover:to-yellow-500 transition-all"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
