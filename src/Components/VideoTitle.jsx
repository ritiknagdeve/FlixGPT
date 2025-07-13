import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="h-screen pt-[25%] sm:pt-[20%] px-4 sm:px-6 md:px-12 lg:px-24 absolute top-0 left-0 text-white bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg">{title}</h1>
      <p className="text-xs sm:text-sm md:text-lg w-full md:w-2/3 lg:w-1/2 mb-6 sm:mb-8 leading-relaxed drop-shadow-md line-clamp-3 sm:line-clamp-none">{overview}</p>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button className="bg-white text-black px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-xl rounded-md hover:bg-opacity-80 transition-all duration-200 flex items-center justify-center font-semibold">
          <svg className="w-4 h-4 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Play
        </button>
        <button className="bg-gray-500 bg-opacity-50 text-white px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-xl rounded-md hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center font-semibold">
          <svg className="w-4 h-4 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle