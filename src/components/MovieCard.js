import React from 'react'
import { POSTER_CDN_URL } from '../utils/constants'

const MovieCard = ({posterKey }) => {
  if(!posterKey) return null
  return (
    <div className='w-48 pr-4'>
      <img alt='poster' src={POSTER_CDN_URL + posterKey} />
    </div>
  )
}

export default MovieCard
