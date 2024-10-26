import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-[15%] px-24 absolute bg-gradient-to-r from-black w-screen aspect-video text-white  '>
      <h1 className='font-bold text-6xl'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className='flex'>
         <button className='bg-white text-black p-4 px-12 text-xl rounded-md hover:bg-opacity-80'> ▶️ play</button>
         <button  className='bg-gray-500 text-white p-4 px-12 mx-2 text-xl bg-opacity-50 rounded-md'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
