import React,{useEffect, useState} from 'react';
import { useGetTrailer } from '../hooks/useGetTrailer'; 

const MovieModal = ({ movie, onClose }) => {

    const [trailerKey, setTrailerKey] = useState(null);


  if (!movie) return null;

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerKey = await useGetTrailer(movie.id);
      console.log("Trailer Key:", trailerKey);
      setTrailerKey(trailerKey);
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div
        className="relative bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl mx-4 p-0 animate-fadeIn overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-2xl font-bold focus:outline-none z-10"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Trailer at the top */}
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          {trailerKey ? (
            <iframe
              className="w-full h-full rounded-t-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&mute=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
        </div>
        {/* Info below trailer */}
        <div className="p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{movie.title}</h2>
          <p className="text-gray-300 text-sm mb-4">{movie.overview || 'No description available.'}</p>
          <div className="flex flex-wrap gap-4 text-gray-400 text-xs mb-2">
            {movie.release_date && <span>Release: {movie.release_date}</span>}
            {movie.vote_average && <span>Rating: {movie.vote_average} ⭐</span>}
            {movie.original_language && <span>Language: {movie.original_language.toUpperCase()}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
