import React, { useRef, useState } from 'react'
import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 640;
      scrollRef.current.scrollBy({
        left: isMobile ? -300 : -800,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 640;
      scrollRef.current.scrollBy({
        left: isMobile ? 300 : 800,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="px-4 sm:px-8 py-2 sm:py-4">       
      <h2 className="text-white text-lg sm:text-2xl font-bold px-2 sm:px-4 mb-3 sm:mb-4">{title}</h2>
      <div className="relative group">
        
        {/* Left Arrow - Hidden on mobile */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hidden sm:block"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        )}

        {/* Right Arrow - Hidden on mobile */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hidden sm:block"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        )}

        {/* Movie Cards Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 sm:pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies && movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList