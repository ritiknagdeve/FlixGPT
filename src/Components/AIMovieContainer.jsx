import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

// Shimmer Card Component
const ShimmerCard = () => (
  <div className="flex-shrink-0 w-64 animate-pulse">
    <div className="bg-gray-700 h-36 rounded-lg mb-2"></div>
    <div className="bg-gray-600 h-4 rounded w-3/4"></div>
  </div>
);

// Shimmer Movie List Component
const ShimmerMovieList = ({ title }) => (
  <div className="px-8 py-4">
    <div className="bg-gray-600 h-6 rounded w-48 mb-4 animate-pulse"></div>
    <div className="flex gap-4 overflow-hidden">
      {[...Array(5)].map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  </div>
);

const AIMovieContainer = () => {
  console.log("AIMovieContainer rendered");
  
  const {aiResults, tmdbResults, isLoading} = useSelector((store) => store.ai);
  console.log("AI Results:", aiResults);
  console.log("TMDB Results:", tmdbResults);
  console.log("Is Loading:", isLoading);

  // Show shimmer when loading
  if (isLoading) {
    return (
      <div className="bg-black">
        <div className="text-white text-center py-8">
          <h2 className="text-3xl font-bold mb-2">AI is finding your perfect movies...</h2>
          <p className="text-gray-400">Please wait while we search for recommendations</p>
        </div>
        {[...Array(3)].map((_, index) => (
          <ShimmerMovieList key={index} title={`Loading Movie ${index + 1}...`} />
        ))}
      </div>
    );
  }

  // Don't render if no results yet
  if (!aiResults) return null;

  return (
    <>
    <div className="bg-black">
      <div className="text-white text-center py-8">
        <h2 className="text-3xl font-bold mb-2">AI Movie Recommendations</h2>
        <p className="text-gray-400">Based on your search preferences</p>
      </div>
      <div>
        {aiResults.split(',').map((movie, index) => {
          return (
            <MovieList 
              key={movie.trim()} 
              title={movie.trim()}
              movies={tmdbResults[index]} 
            />
          )
        })}
      </div>
    </div>
    </>
  )
}

export default AIMovieContainer