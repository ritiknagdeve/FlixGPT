import React from 'react'
import {options} from '../utils/constants';
import { useEffect, useState } from 'react';

const VideoBackground = ({movieId}) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const getMovieVideos = async (movieId) => {
    try {
      const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=en-US', options);
      console.log("MovieId", movieId);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const json = await data.json();
      console.log("Movie Videos:", json);
      
      // Filter for trailers
      const trailers = json.results?.filter(video => video.type === "Trailer");
      console.log("Trailers found:", trailers);

      const trailerToPlay = trailers?.[1] || trailers?.[0];
      console.log("Trailer to play:", trailerToPlay);

      const key = trailerToPlay?.key;
      console.log("Trailer key:", key);
      
      // Set the trailer key in state
      setTrailerKey(key);
      
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  } 

  useEffect(() => {
    if (movieId) {
      getMovieVideos(movieId);
    }
  }, [movieId]);

  return (
    <div className="relative w-[99vw] h-screen overflow-hidden">
      {trailerKey && (
        <>
          <iframe 
            className="absolute top-0 left-0 w-[133vw] h-[133vh] -translate-x-[16.5vw] -translate-y-[16.5vh]"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&loop=1&playlist=${trailerKey}&rel=0&modestbranding=1&enablejsapi=1`}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  
            allowFullScreen
            style={{ pointerEvents: 'none' }}
            id="youtube-player"
          />
          
          {/* Video Controls Overlay */}
          <div className="absolute bottom-6 right-6 z-30 flex space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-200"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all duration-200"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>
        </>
      )
      }
    </div>
  )
}

export default VideoBackground