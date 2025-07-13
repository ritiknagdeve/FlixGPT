import React from 'react'
import {imgCDNURL} from '../utils/constants';

const MovieCard = ({movie}) => {
  console.log("MovieCard", movie);
  const posterPath = movie.poster_path;
  
  if (!posterPath) return null;
  
  return (
    <div className="px-2 sm:px-4 flex-shrink-0 w-32 sm:w-64 group cursor-pointer transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={`${imgCDNURL}${posterPath}`} 
          alt={movie.title}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
          </div>
        </div>
      </div>
      
      <h3 className="text-white text-xs sm:text-sm mt-1 sm:mt-2 truncate group-hover:text-gray-300 transition-colors">
        {movie.title}
      </h3>
    </div>
  )
}

export default MovieCard