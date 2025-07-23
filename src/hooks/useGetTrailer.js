import {options} from '../utils/constants';

export const useGetTrailer = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for trailers
    const trailers = data.results?.filter(video => video.type === "Trailer");
    
    // Return the key of the first trailer found, or null if none found
    return trailers?.[0]?.key || null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null; // Return null in case of error
  }
}