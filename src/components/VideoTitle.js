import React from 'react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="pt-[40%] md:pt-[30%] lg:pt-[15%] px-4 md:px-12 lg:px-24 absolute bg-gradient-to-r from-black w-full aspect-video text-white flex flex-col items-center lg:items-start lg:text-left">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl text-center lg:text-left mb-2 md:mb-4 lg:mb-4">
                {title}
            </h1>

            {/* Display overview only on large screens */}
            <p className="py-4 text-sm md:text-base lg:text-lg lg:w-2/4 hidden lg:block">
                {overview}
            </p>

            <div className="flex space-x-4 md:mt-6 lg:mt-6 justify-center lg:justify-start">
                <button className="bg-white text-black p-2 px-3 md:p-3 md:px-5 lg:p-3 lg:px-10 text-sm md:text-base lg:text-l rounded-md hover:bg-opacity-80 transition-all">
                    ▶️ Play
                </button>
                <button className="bg-gray-500 text-white p-2 px-3 md:p-3 md:px-5 lg:p-3 lg:px-10 text-sm md:text-base lg:text-l bg-opacity-50 rounded-md hover:bg-gray-600 transition-all">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
